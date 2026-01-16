import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building, Globe, FileText, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function CompanyFormation() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Start Your Business in Dubai</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Expert guidance for company formation, PRO services, and visa processing.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Mainland & Freezone</h3>
            <p className="text-muted-foreground">Strategic advice on choosing the right jurisdiction for your business activities and ownership structure.</p>
          </div>
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">PRO & Visa Services</h3>
            <p className="text-muted-foreground">Complete handling of government paperwork, employment visas, family visas, and document clearing.</p>
          </div>
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Trade License Renewal</h3>
            <p className="text-muted-foreground">Timely reminders and efficient processing for trade license renewals and amendments.</p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-8">Why Choose Us?</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left mb-10">
              {['100% Transparency', 'Fast Processing', 'Dedicated Consultant', 'Cost-Effective Solutions'].map((item) => (
                <div key={item} className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-primary/30 transition-all">
                Start Company
              </Link>
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-white text-foreground border border-border font-bold hover:bg-slate-50 transition-all">
                Talk to PRO
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
