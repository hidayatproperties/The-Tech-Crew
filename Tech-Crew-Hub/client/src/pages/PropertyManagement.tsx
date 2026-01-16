import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  "Comprehensive Property Maintenance",
  "Interior Design & Furnishing",
  "Legal Document Management",
  "Tenant Screening & Leasing",
  "Professional Photography",
  "Utility Bill Management",
  "Rent Collection Services",
  "Detailed Financial Reporting"
];

export default function PropertyManagement() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Hassle-Free <br/><span className="text-primary">Property Management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Maximize your investment returns while we handle the day-to-day operations. 
              From maintenance to tenant relations, we've got you covered.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {services.map((service, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground font-medium">{service}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-center shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all">
                Get a Quote
              </Link>
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-white text-foreground border border-border font-bold text-center hover:bg-slate-50 transition-all">
                Request Management
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-3"></div>
            {/* Interior design / living room image */}
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Interior" 
              className="relative rounded-3xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
