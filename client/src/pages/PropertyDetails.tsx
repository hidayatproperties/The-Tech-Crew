import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProperty } from "@/hooks/use-properties";
import { useParams } from "wouter";
import { Loader2, BedDouble, Bath, Square, MapPin, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function PropertyDetails() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const { data: property, isLoading } = useProperty(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h2 className="text-2xl font-bold">Property not found</h2>
          <Link href="/real-estate" className="text-primary hover:underline mt-4 inline-block">
            Back to Real Estate
          </Link>
        </div>
      </div>
    );
  }

  const specs = property.specs as { bedrooms: number; bathrooms: number; area: number };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/real-estate" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Listings
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={property.imageUrl || ''} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Images Grid */}
            {property.images && property.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.images.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
                    <img 
                      src={img} 
                      alt={`${property.title} - ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => window.open(img, '_blank')}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {specs.bedrooms !== undefined && specs.bedrooms !== null && (
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-bold">{specs.bedrooms}</p>
                </div>
              )}
              {specs.bathrooms !== undefined && specs.bathrooms !== null && (
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-bold">{specs.bathrooms}</p>
                </div>
              )}
              {specs.area !== undefined && specs.area !== null && (
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                  <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-bold">{specs.area} sqft</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {property.type === 'both' ? 'Buy / Rent' : property.type}
                </span>
                {property.isFeatured && (
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-muted-foreground text-lg mb-6">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                {property.location}
              </div>
              <div className="text-3xl font-bold text-primary">
                {property.price ? (
                  <>
                    ${property.price.toLocaleString()}
                    {property.type === 'rent' && <span className="text-xl text-muted-foreground font-normal">/month</span>}
                  </>
                ) : (
                  <a 
                    href={`https://wa.me/971565740835?text=${encodeURIComponent(`I'm interested in: ${property.title} (${property.location})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg hover:underline"
                  >
                    Contact for Price
                  </a>
                )}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            <div className="flex gap-4">
              <a 
                href={`https://wa.me/971565740835?text=${encodeURIComponent(`I'm interested in: ${property.title} (${property.location})`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-center shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Inquire via WhatsApp
              </a>
              <Link 
                href="/contact"
                className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-bold text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
