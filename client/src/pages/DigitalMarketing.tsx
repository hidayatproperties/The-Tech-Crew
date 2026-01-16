import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Share2, PenTool, BarChart } from "lucide-react";
import { Link } from "wouter";

export default function DigitalMarketing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6">
          Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Digital Presence</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Data-driven strategies to grow your traffic, leads, and revenue.
        </p>
        <Link href="/contact" className="px-8 py-4 rounded-xl bg-foreground text-white font-bold shadow-lg hover:-translate-y-1 transition-all">
          Free Consultation
        </Link>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Search Engine Optimization (SEO)</h3>
                  <p className="text-muted-foreground">Rank higher on Google with our technical SEO, content strategy, and link building services.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Social Media Marketing</h3>
                  <p className="text-muted-foreground">Engage your audience across Instagram, LinkedIn, and Facebook with creative campaigns.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Content & Design</h3>
                  <p className="text-muted-foreground">Compelling copywriting and stunning graphic design that communicates your brand value.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-purple-900 to-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Boost My Business</h3>
                <p className="text-slate-300 mb-8">
                  Stop guessing. Start growing. Our team of experts is ready to audit your current digital presence and create a roadmap for success.
                </p>
                <Link href="/contact" className="inline-block w-full py-4 rounded-xl bg-white text-purple-900 font-bold text-center hover:bg-slate-100 transition-colors">
                  Get Started Now
                </Link>
              </div>
              <BarChart className="absolute bottom-0 right-0 w-64 h-64 text-white/5 -mr-10 -mb-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
