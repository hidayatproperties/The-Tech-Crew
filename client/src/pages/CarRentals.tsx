import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { useCars } from "@/hooks/use-cars";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CarRentals() {
  const [category, setCategory] = useState<'economy' | 'luxury' | '4x4' | undefined>(undefined);
  const { data: cars, isLoading } = useCars(category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Luxury & Economy Fleet</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Drive the dream. Choose from our wide selection of premium vehicles.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setCategory(undefined)} className={`px-6 py-2 rounded-xl font-medium transition-all shadow-sm ${!category ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-slate-50'}`}>All Cars</button>
          <button onClick={() => setCategory('economy')} className={`px-6 py-2 rounded-xl font-medium transition-all shadow-sm ${category === 'economy' ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-slate-50'}`}>Economy</button>
          <button onClick={() => setCategory('luxury')} className={`px-6 py-2 rounded-xl font-medium transition-all shadow-sm ${category === 'luxury' ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-slate-50'}`}>Luxury</button>
          <button onClick={() => setCategory('4x4')} className={`px-6 py-2 rounded-xl font-medium transition-all shadow-sm ${category === '4x4' ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-slate-50'}`}>4x4 / SUV</button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
