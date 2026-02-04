import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Building2, Key, Building, TrendingUp, Car } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero background image - modern office/cityscape */}
          <img 
            src="https://i.postimg.cc/yNLZHq61/david-rodrigo-Fr6zexbmjmc-unsplash.jpg" 
            alt="City Skyline" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            One Stop. <span className="text-gradient">Infinite Solutions.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-semibold max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            From finding your dream home to launching your dream business. 
            The Tech Crew is your growth partner in Dubai.
            
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We offer a comprehensive suite of services designed to simplify your life and amplify your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Real Estate" 
              description="Find your perfect home or investment property with our curated listings."
              icon={Building2}
              href="/real-estate"
              ctaText="View Properties"
            />
            <ServiceCard 
              title="Property Management" 
              description="Full-service management including maintenance, photography, and legal docs."
              icon={Key}
              href="/property-management"
              ctaText="Our Services"
            />
            <ServiceCard 
              title="Company Formation" 
              description="Launch your business in Dubai with our PRO, Visa, and licensing services."
              icon={Building}
              href="/company-formation"
              ctaText="Start Now"
            />
            <ServiceCard 
              title="Digital Marketing" 
              description="Boost your brand with SEO, social media management, and web design."
              icon={TrendingUp}
              href="/digital-marketing"
              ctaText="Grow Now"
            />
            <ServiceCard 
              title="Car Rentals" 
              description="Premium fleet of economy, luxury, and 4x4 vehicles for your journey."
              icon={Car}
              href="/car-rentals"
              ctaText="Book Now"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Ready to transform your lifestyle?</h2>
          <p className="text-lg text-muted-foreground mb-10">Whether you need a new home, a new company license, or a ride for the weekend, we're here to help.</p>
          <Link href="/contact" className="inline-block px-10 py-5 rounded-xl bg-foreground text-background font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Contact Us Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
