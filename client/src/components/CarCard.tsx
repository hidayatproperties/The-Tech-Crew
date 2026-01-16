import type { Car } from "@shared/schema";
import { Check, Star, ImageIcon, X } from "lucide-react";
import { useState } from "react";

export function CarCard({ car }: { car: Car }) {
  const [showGallery, setShowGallery] = useState(false);
  const allImages = [car.imageUrl, ...(car.images || [])];

  return (
    <div className="glass-card overflow-hidden group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img 
          src={car.imageUrl} 
          alt={car.name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {car.category}
        </div>
        {car.images && car.images.length > 0 && (
          <button 
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg hover:bg-white transition-colors z-10"
          >
            <ImageIcon className="w-5 h-5 text-slate-700" />
          </button>
        )}
      </div>

      {showGallery && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] p-4 sm:p-8 flex flex-col items-center justify-center">
          <button 
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl overflow-y-auto max-h-full py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allImages.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src={img} alt={`${car.name} - ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-bold text-xl">{car.name}</h3>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">(5.0)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-primary">${car.pricePerDay}</div>
            <div className="text-xs text-muted-foreground">per day</div>
          </div>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          {car.features?.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center text-sm text-muted-foreground">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {feature}
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            const whatsappNumber = "971565740835";
            const message = `Hello, I'm interested in booking the ${car.name} (${car.category}). Price: $${car.pricePerDay}/day. Please let me know availability.`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full py-3 rounded-xl font-semibold bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
