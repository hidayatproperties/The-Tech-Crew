import type { Car } from "@shared/schema";
import { Check, Star } from "lucide-react";

export function CarCard({ car }: { car: Car }) {
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
      </div>

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
