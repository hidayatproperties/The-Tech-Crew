import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/use-properties";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RealEstate() {
  const [filter, setFilter] = useState<'all' | 'buy' | 'rent' | 'both'>('all');
  const { data: properties, isLoading } = useProperties(
    filter === 'all' ? undefined : { type: filter }
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Premium Real Estate</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Discover exclusive properties for sale and rent in prime locations.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-border">
            {['all', 'buy', 'rent', 'both'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                  filter === f 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted-foreground hover:bg-slate-50'
                }`}
              >
                {f === 'both' ? 'Buy/Rent' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
