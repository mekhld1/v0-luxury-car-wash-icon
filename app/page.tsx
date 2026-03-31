import { ShinyLogo, ShinyLogoMark } from "@/components/shiny-logo"

export default function ShinyLogoShowcase() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShinyLogoMark size={40} />
            <span className="text-white font-semibold text-lg">Shiny</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Brand Guidelines</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
            <span className="text-violet-400 text-sm font-medium">Premium App Icon</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Shiny
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Luxury car wash platform for Saudi Arabia
          </p>
        </div>

        {/* Main Logo Display */}
        <div className="flex justify-center mb-20">
          <div className="relative group">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-violet-500/30 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <div className="relative">
              <ShinyLogo size={320} className="drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Size Variations</h2>
          <p className="text-slate-500 text-center mb-10">Optimized for every context — from app icons to favicons</p>
          
          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {[
              { size: 256, label: "App Store", subLabel: "1024px" },
              { size: 180, label: "iOS Home", subLabel: "180px" },
              { size: 120, label: "Spotlight", subLabel: "120px" },
              { size: 80, label: "Settings", subLabel: "80px" },
              { size: 48, label: "Tab Bar", subLabel: "48px" },
              { size: 32, label: "Favicon", subLabel: "32px" },
              { size: 16, label: "Tiny", subLabel: "16px" },
            ].map(({ size, label, subLabel }) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5 hover:border-violet-500/30 transition-colors">
                  <ShinyLogo size={size} />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-slate-500 text-xs">{subLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logo Mark Variations */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Logo Mark</h2>
          <p className="text-slate-500 text-center mb-10">Standalone symbol for flexible applications</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* On Dark */}
            <div className="bg-slate-900 rounded-3xl p-10 flex flex-col items-center gap-6 border border-white/5">
              <ShinyLogoMark size={120} />
              <span className="text-slate-400 text-sm">On Dark</span>
            </div>
            {/* On Light */}
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center gap-6">
              <ShinyLogoMark size={120} />
              <span className="text-slate-600 text-sm">On Light</span>
            </div>
            {/* On Brand */}
            <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-3xl p-10 flex flex-col items-center gap-6">
              <ShinyLogoMark size={120} />
              <span className="text-white/80 text-sm">On Brand</span>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Color Palette</h2>
          <p className="text-slate-500 text-center mb-10">Premium purple gradient system</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { color: "#5B21B6", name: "Violet 800", role: "Primary Deep" },
              { color: "#6D28D9", name: "Violet 700", role: "Primary" },
              { color: "#7C3AED", name: "Violet 600", role: "Vibrant" },
              { color: "#A78BFA", name: "Violet 400", role: "Light" },
              { color: "#C4B5FD", name: "Violet 300", role: "Glow" },
            ].map(({ color, name, role }) => (
              <div key={color} className="group">
                <div 
                  className="aspect-square rounded-2xl mb-3 shadow-lg group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                />
                <p className="text-white text-sm font-medium">{name}</p>
                <p className="text-slate-500 text-xs">{color}</p>
                <p className="text-violet-400 text-xs mt-1">{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Elements */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Design Elements</h2>
          <p className="text-slate-500 text-center mb-10">Key visual components</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Water Droplet",
                desc: "Pure, rounded shape symbolizing premium car cleaning"
              },
              { 
                title: "Purple Gradient",
                desc: "Deep violet to lavender gradient for luxury feel"
              },
              { 
                title: "Glossy Shine",
                desc: "Top highlight creates 3D glass-like reflection"
              },
              { 
                title: "Clean Minimal",
                desc: "Empty droplet for timeless, scalable design"
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Context */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">In Context</h2>
          <p className="text-slate-500 text-center mb-10">App Store presence mockup</p>
          
          {/* App Store Card Mockup */}
          <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 rounded-3xl p-6 border border-white/10">
              <div className="flex items-start gap-5 mb-6">
                <ShinyLogo size={100} className="rounded-[22px] shadow-xl" />
                <div className="flex-1 pt-1">
                  <h3 className="text-white font-semibold text-lg mb-1">Shiny</h3>
                  <p className="text-slate-400 text-sm mb-2">Luxury Car Wash</p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                    <span className="text-slate-500 text-xs">4.9 (2.4K)</span>
                  </div>
                </div>
                <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
                  GET
                </button>
              </div>
              <div className="flex gap-2">
                {["#1 Car Wash", "Premium", "Saudi"].map((tag) => (
                  <span key={tag} className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-10 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            Shiny™ — Premium Car Wash Platform for Saudi Arabia
          </p>
        </footer>
      </div>
    </main>
  )
}
