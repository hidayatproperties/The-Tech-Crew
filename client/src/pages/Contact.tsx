import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertEnquirySchema } from "@shared/schema";
import { useCreateEnquiry } from "@/hooks/use-enquiries";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Make type required for the form selector
const formSchema = insertEnquirySchema.extend({
  type: z.enum(['general', 'property-management', 'real-estate', 'company-formation', 'marketing', 'car-rental']),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const mutation = useCreateEnquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'general',
      status: 'new'
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        const whatsappNumber = "971565740835";
        const message = `New Inquiry from Website:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.type}\nMessage: ${data.message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        
        toast({
          title: "Message Sent!",
          description: "We'll get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to get started? Fill out the form below and our team will contact you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4 shrink-0" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Call Us</p>
                    <p className="text-muted-foreground">+971 56 574 0835</p>
                    <p className="text-muted-foreground">+971 54 797 6886</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-4 shrink-0" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-muted-foreground">info@thetechcrew.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 md:p-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...form.register("phone")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Interest</label>
                  <select
                    {...form.register("type")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="property-management">Property Management</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="company-formation">Company Formation</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="car-rental">Car Rental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {form.formState.errors.message && <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <a 
        href="https://wa.me/971565740835" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <Footer />
    </div>
  );
}
