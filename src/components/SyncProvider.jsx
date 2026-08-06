"use client";

import { useEffect, useState } from "react";

export default function SyncProvider({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Intercept localStorage.setItem globally to auto-sync client writes to the server
    const originalSetItem = localStorage.setItem;
    
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      
      // Auto sync all client changes for clarity_* keys to the server
      if (key && key.startsWith("clarity_")) {
        try {
          fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, data: JSON.parse(value) })
          }).catch(err => console.error(`Sync error for key ${key}:`, err));
        } catch (e) {
          // If not valid JSON, send as string
          fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, data: value })
          }).catch(err => console.error(`Sync error (string) for key ${key}:`, err));
        }
      }
    };

    // Load initial server-side state on mount to sync client with the server-side DB
    const syncContent = async () => {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) return;
        const result = await res.json();
        
        if (result.success && result.data) {
          const keys = Object.keys(result.data);
          
          keys.forEach(key => {
            if (!key.startsWith("clarity_")) return;
            
            const serverData = result.data[key];
            if (serverData === undefined || serverData === null) return;
            
            const serverValStr = typeof serverData === "string" ? serverData : JSON.stringify(serverData);
            const clientVal = localStorage.getItem(key);
            
            if (clientVal) {
              // If client has custom data in localStorage, sync client data to server!
              try {
                fetch("/api/content", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ key, data: JSON.parse(clientVal) })
                }).catch(() => {});
              } catch { }
            } else {
              // If client has no local storage value yet, populate from server
              originalSetItem.call(localStorage, key, serverValStr);
            }
          });
        }
      } catch (err) {
        console.error("Initial load sync failed:", err);
      } finally {
        setLoaded(true);
      }
    };

    syncContent();

    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return <>{children}</>;
}
