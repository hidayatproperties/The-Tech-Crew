import type { Property } from "@shared/schema";
import { BedDouble, Bath, Square, MapPin } from "lucide-react";
import { Link } from "wouter";

export function PropertyCard({ property }: { property: Property }) {
  // Safe cast for specs since schema defines them
  const specs = property.specs as { bedrooms: number; bathrooms: number; area: number };

  return (
    <div className="glass-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.imageUrl || ''} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {property.type === 'both' ? 'Buy / Rent' : property.type}
        </div>
        {property.isFeatured && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg line-clamp-1">{property.title}</h3>
          <span className="font-bold text-primary whitespace-nowrap">
            {property.price ? (
              <>
                ${property.price.toLocaleString()}
                {property.type === 'rent' && <span className="text-sm text-muted-foreground font-normal">/mo</span>}
                {property.type === 'both' && <span className="text-sm text-muted-foreground font-normal"> (Sale/Rent)</span>}
              </>
            ) : (
              "Contact for Price"
            )}
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          {specs.bedrooms !== undefined && specs.bedrooms !== null && (
            <div className="flex items-center">
              <BedDouble className="w-4 h-4 mr-2 text-primary" />
              <span>{specs.bedrooms} Beds</span>
            </div>
          )}
          {specs.bathrooms !== undefined && specs.bathrooms !== null && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-2 text-primary" />
              <span>{specs.bathrooms} Baths</span>
            </div>
          )}
          {specs.area !== undefined && specs.area !== null && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-2 text-primary" />
              <span>{specs.area} sqft</span>
            </div>
          )}
        </div>

        <Link href={`/real-estate/${property.id}`} className="block mt-6 w-full py-3 text-center rounded-xl font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300">
          View Details
        </Link>
      </div>
    </div>
  );
}
