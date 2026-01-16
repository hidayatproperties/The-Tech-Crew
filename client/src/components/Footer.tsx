import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="font-display font-bold text-2xl text-white mb-4">The Tech Crew</h3>
          <p className="text-sm text-slate-400 mb-6">
            Your all-in-one solution for business setup, property management, marketing, and more.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/real-estate" className="hover:text-white transition-colors">Real Estate</Link></li>
            <li><Link href="/property-management" className="hover:text-white transition-colors">Property Management</Link></li>
            <li><Link href="/company-formation" className="hover:text-white transition-colors">Company Formation</Link></li>
            <li><Link href="/digital-marketing" className="hover:text-white transition-colors">Digital Marketing</Link></li>
            <li><Link href="/car-rentals" className="hover:text-white transition-colors">Car Rentals</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span>+971 56 574 0835 - Mohammad Asad</span>
                <span>+971 54 797 6886 - Zishan Iqbal</span>
              </div>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 shrink-0 text-primary" />
              <span>info@thetechcrew.org</span>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} The Tech Crew. All rights reserved.
      </div>
    </footer>
  );
}
