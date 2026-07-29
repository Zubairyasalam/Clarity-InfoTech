const fs = require('fs');
let c = fs.readFileSync('src/app/admin/page.js', 'utf8');

const uiStr = `
              {/* HEADER LOGO & LINKS */}
              {activeTab === "header-links" && (
                <div className="space-y-6">
                  {/* Save Status & Action Bar */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-[88px] z-30">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">Header Settings</span>
                        <span className="text-xs text-slate-500">Configure logo & navigation links</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button onClick={resetHeader} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer text-xs font-bold">
                        <RefreshCw size={14} /> Reset
                      </button>
                      <button onClick={saveHeader} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 transition cursor-pointer text-xs font-bold">
                        {headerSaveSuccess ? <Check size={14} className="animate-in zoom-in duration-200" /> : <Save size={14} />}
                        {headerSaveSuccess ? "Saved!" : "Save Changes"}
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12 space-y-8">
                      {/* Logo Section */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                          <Image size={18} className="text-[#1E67E2]" /> Logo Image
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Logo URL</label>
                            <input 
                              type="text" 
                              value={headerData.logo} 
                              onChange={(e) => updateHeaderLogo(e.target.value)} 
                              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50" 
                              placeholder="/logo.png" 
                            />
                          </div>
                          <div className="flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200 p-4 h-full min-h-[100px]">
                            {headerData.logo ? (
                              <img src={headerData.logo} alt="Logo Preview" className="max-h-12 object-contain" />
                            ) : (
                              <span className="text-xs text-slate-400">No Image</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                            <Link size={18} className="text-[#1E67E2]" /> Navigation Links
                          </h3>
                          <button onClick={addHeaderLink} className="flex items-center gap-1.5 text-xs font-bold text-[#1E67E2] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
                            <Plus size={14} /> Add Link
                          </button>
                        </div>
                        <div className="space-y-3">
                          {headerData.links.map((link, i) => (
                            <div key={link.id || i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl relative group">
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div>
                                  <input 
                                    type="text" 
                                    value={link.label} 
                                    onChange={(e) => updateHeaderLink(i, 'label', e.target.value)} 
                                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50" 
                                    placeholder="Label (e.g. Home)" 
                                  />
                                </div>
                                <div>
                                  <input 
                                    type="text" 
                                    value={link.url} 
                                    onChange={(e) => updateHeaderLink(i, 'url', e.target.value)} 
                                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50 font-mono" 
                                    placeholder="URL (e.g. /)" 
                                  />
                                </div>
                              </div>
                              <button onClick={() => deleteHeaderLink(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          {headerData.links.length === 0 && (
                            <div className="text-center py-8 text-sm text-slate-400 font-medium">No links added.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
`;

const marker = '              {/* 8. FOOTER EDITOR */}';
if (c.includes(marker)) {
  c = c.replace(marker, uiStr + '\\n' + marker);
  fs.writeFileSync('src/app/admin/page.js', c);
  console.log('Successfully injected UI');
} else {
  console.log('Marker not found');
}
