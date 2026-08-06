import "./globals.css";
import SyncProvider from "../components/SyncProvider";

export const metadata = {
  title: "Clarity InfoTech | Software Engineering & Cloud Solutions",
  description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems.",
  other: {
    "color-scheme": "light"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans h-full antialiased" style={{ colorScheme: "light" }}>
      <body className="min-h-full flex flex-col font-sans bg-[#F7F8FC] text-[#0F1631]">
        <SyncProvider>{children}</SyncProvider>
      </body>
    </html>
  );
}
