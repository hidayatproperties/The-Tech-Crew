import { Link } from "wouter";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  delay?: string;
  ctaText?: string;
}

export function ServiceCard({ title, description, icon: Icon, href, className, delay, ctaText = "Learn More" }: ServiceCardProps) {
  return (
    <div 
      className={cn("glass-card p-8 flex flex-col h-full group relative overflow-hidden", className)}
      style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
      
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 font-display">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
      
      <Link href={href} className="inline-flex items-center font-semibold text-primary group-hover:translate-x-1 transition-transform">
        {ctaText} <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}
