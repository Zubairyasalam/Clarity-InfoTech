const fs = require('fs');
let c = fs.readFileSync('src/app/admin/page.js', 'utf8');

const replacement = `        {/* Sidebar Nav links */}
        <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto">
          {/* Analytics Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Analytics</span>
            <div className="space-y-1">
              {[
                { id: "overview", label: "Dashboard", icon: Activity },
                { id: "inquiries", label: "Inquiries Inbox", icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer \${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }\`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Content</span>
            <div className="space-y-1">
              {[
                { id: "hero-slides", label: "Hero Section", icon: Image },
                { id: "about-us", label: "About Section", icon: Shield },
                { id: "services", label: "Our Services", icon: Briefcase },
                { id: "platforms", label: "Work Culture", icon: Layers },
                { id: "projects", label: "Projects", icon: FileText },
                { id: "why-join", label: "Why Join Us", icon: Shield },
                { id: "gallery", label: "Moments Gallery", icon: Image },
                { id: "faq", label: "Contact Us Page", icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer \${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }\`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customization Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Customization</span>
            <div className="space-y-1">
              {[
                { id: "header-links", label: "Header Logo & Links", icon: Link },
                { id: "footer", label: "Website Footer", icon: Globe },
                { id: "legal-pages", label: "Legal Pages", icon: Shield },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer \${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }\`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <details className="group">
                <summary className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer text-slate-500 hover:bg-slate-50 hover:text-slate-800 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Pages</span>
                  </div>
                  <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-9 pr-3 py-1 space-y-1">
                  {[
                    { id: "page-about", label: "About Page", icon: FileText },
                    { id: "page-team", label: "Meet Our Team", icon: FileText },
                    { id: "page-service", label: "Our Service", icon: Briefcase },
                    { id: "page-legal", label: "Legal Pages", icon: Shield },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={\`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer \${isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                          }\`}
                      >
                        <Icon size={14} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>

          {/* System Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">System</span>
            <div className="space-y-1">
              {[
                { id: "system-config", label: "System Configuration", icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={\`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer \${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }\`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>`;

const startIdx = c.indexOf('{/* Sidebar Nav links */}');
const endIdx = c.indexOf('{/* Bottom Sidebar Copyright */}');

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = c.substring(0, startIdx) + replacement + '\n\n        ' + c.substring(endIdx);
  fs.writeFileSync('src/app/admin/page.js', newContent);
  console.log('Sidebar replaced successfully.');
} else {
  console.log('Could not find start or end markers.');
}
