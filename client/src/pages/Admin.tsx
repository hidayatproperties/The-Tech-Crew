import { Navbar } from "@/components/Navbar";
import { useUser } from "@/hooks/use-auth";
import { useEnquiries } from "@/hooks/use-enquiries";
import { useProperties, useDeleteProperty, useCreateProperty, useUpdateProperty } from "@/hooks/use-properties";
import { useCars, useDeleteCar, useCreateCar, useUpdateCar } from "@/hooks/use-cars";
import { useState, useEffect } from "react";
import { Loader2, Trash2, Plus, LayoutGrid, Car as CarIcon, MessageSquare, X, Edit2, Image as ImageIcon } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPropertySchema, insertCarSchema } from "@shared/schema";

export default function Admin() {
  const { data: user, isLoading: authLoading } = useUser();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'properties' | 'cars' | 'enquiries'>('properties');
  
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary"/></div>;
  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h1 className="text-3xl font-bold mb-8 font-display">Admin Dashboard</h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('properties')} 
            className={`px-6 py-3 rounded-xl font-semibold flex items-center shadow-sm transition-all ${activeTab === 'properties' ? 'bg-primary text-white scale-105 shadow-primary/25' : 'bg-white text-muted-foreground hover:bg-slate-100'}`}
          >
            <LayoutGrid className="w-5 h-5 mr-2" /> Properties
          </button>
          <button 
            onClick={() => setActiveTab('cars')} 
            className={`px-6 py-3 rounded-xl font-semibold flex items-center shadow-sm transition-all ${activeTab === 'cars' ? 'bg-primary text-white scale-105 shadow-primary/25' : 'bg-white text-muted-foreground hover:bg-slate-100'}`}
          >
            <CarIcon className="w-5 h-5 mr-2" /> Cars
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')} 
            className={`px-6 py-3 rounded-xl font-semibold flex items-center shadow-sm transition-all ${activeTab === 'enquiries' ? 'bg-primary text-white scale-105 shadow-primary/25' : 'bg-white text-muted-foreground hover:bg-slate-100'}`}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Enquiries
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden">
          <div className="p-6 md:p-8">
            {activeTab === 'properties' && <PropertiesManager />}
            {activeTab === 'cars' && <CarsManager />}
            {activeTab === 'enquiries' && <EnquiriesList />}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertiesManager() {
  const { data: properties, isLoading } = useProperties();
  const { mutate: deleteProperty } = useDeleteProperty();
  const { mutate: createProperty, isPending: isCreating } = useCreateProperty();
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const form = useForm<any>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      type: "buy",
      location: "",
      price: 0,
      imageUrl: "",
      images: [],
      specs: { bedrooms: 1, bathrooms: 1, area: 500 },
      features: [],
      isFeatured: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images"
  });

  useEffect(() => {
    if (editingProperty) {
      form.reset({
        title: editingProperty.title,
        description: editingProperty.description,
        type: editingProperty.type,
        location: editingProperty.location,
        price: editingProperty.price,
        imageUrl: editingProperty.imageUrl,
        images: editingProperty.images || [],
        specs: editingProperty.specs,
        features: editingProperty.features,
        isFeatured: editingProperty.isFeatured
      });
    } else {
      form.reset({
        title: "",
        description: "",
        type: "buy",
        location: "",
        price: 0,
        imageUrl: "",
        images: [],
        specs: { bedrooms: 1, bathrooms: 1, area: 500 },
        features: [],
        isFeatured: false
      });
    }
  }, [editingProperty, form]);

  const onSubmit = (data: any) => {
    // Filter out empty image URLs and handle potential undefined
    const images = Array.isArray(data.images) ? data.images.filter((img: any) => typeof img === 'string' && img.trim() !== "") : [];
    
    const formattedData = {
      ...data,
      images
    };

    if (editingProperty) {
      updateProperty({ id: editingProperty.id, data: formattedData }, {
        onSuccess: () => {
          toast({ title: "Property Updated" });
          setShowForm(false);
          setEditingProperty(null);
        }
      });
    } else {
      createProperty(formattedData, {
        onSuccess: () => {
          toast({ title: "Property Created" });
          setShowForm(false);
          form.reset();
        }
      });
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Properties</h2>
          <p className="text-slate-500 text-sm">Add, edit or remove real estate listings</p>
        </div>
        <button onClick={() => { setEditingProperty(null); setShowForm(true); }} className="flex items-center text-sm bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Plus className="w-5 h-5 mr-1.5" /> Add Property
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-slate-900">{editingProperty ? "Edit Property" : "Add New Property"}</h3>
              <button onClick={() => { setShowForm(false); setEditingProperty(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Title</label>
                    <input {...form.register("title")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Modern Villa" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Type</label>
                    <select {...form.register("type")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Location</label>
                    <input {...form.register("location")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Palm Jumeirah, Dubai" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Price (USD)</label>
                    <input type="number" {...form.register("price", { valueAsNumber: true })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Main Image URL</label>
                    <input {...form.register("imageUrl")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">Additional Images</label>
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                          <input
                            {...form.register(`images.${index}` as any)}
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="Additional image URL..."
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2.5 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append("")}
                        className="flex items-center gap-2 text-sm text-primary font-bold hover:underline"
                      >
                        <Plus className="w-4 h-4" /> Add Another Image
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Bedrooms</label>
                    <input type="number" {...form.register("specs.bedrooms", { valueAsNumber: true })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Area (sqft)</label>
                    <input type="number" {...form.register("specs.area", { valueAsNumber: true })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="isFeatured" {...form.register("isFeatured")} className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary transition-all cursor-pointer" />
                    <label htmlFor="isFeatured" className="text-sm font-bold text-slate-900 cursor-pointer">Mark as Featured Property</label>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 ml-8">Featured properties appear on the home page and at the top of search results.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea {...form.register("description")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows={4} placeholder="Detailed description of the property, features, and amenities..." />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowForm(false); setEditingProperty(null); }} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={isCreating || isUpdating} className="flex-[2] py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50">
                    {isCreating || isUpdating ? <Loader2 className="animate-spin mx-auto w-5 h-5"/> : editingProperty ? "Update Property" : "Create Property Listing"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 -mx-6 md:mx-0 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-50/50 border-y border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-900">Property</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Price</th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties?.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{p.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${p.type === 'buy' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {p.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-slate-700">
                  ${p.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => { setEditingProperty(p); setShowForm(true); }} className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2.5 rounded-xl transition-all">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteProperty(p.id)} className="text-slate-400 hover:text-destructive hover:bg-destructive/10 p-2.5 rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {properties?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  No properties found. Start by adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CarsManager() {
  const { data: cars, isLoading } = useCars();
  const { mutate: deleteCar } = useDeleteCar();
  const { mutate: createCar, isPending: isCreating } = useCreateCar();
  const { mutate: updateCar, isPending: isUpdating } = useUpdateCar();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);

  const form = useForm<any>({
    resolver: zodResolver(insertCarSchema),
    defaultValues: {
      name: "",
      category: "economy",
      pricePerDay: 0,
      imageUrl: "",
      images: [],
      isAvailable: true,
      features: [],
      description: ""
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images"
  });

  useEffect(() => {
    if (editingCar) {
      form.reset({
        name: editingCar.name,
        category: editingCar.category,
        pricePerDay: editingCar.pricePerDay,
        imageUrl: editingCar.imageUrl,
        images: editingCar.images || [],
        isAvailable: editingCar.isAvailable,
        features: editingCar.features,
        description: editingCar.features?.join(', ') || ""
      });
    } else {
      form.reset({
        name: "",
        category: "economy",
        pricePerDay: 0,
        imageUrl: "",
        images: [],
        isAvailable: true,
        features: [],
        description: ""
      });
    }
  }, [editingCar, form]);

  const onSubmit = (data: any) => {
    const images = Array.isArray(data.images) ? data.images.filter((img: any) => typeof img === 'string' && img.trim() !== "") : [];
    
    const formattedData = {
      ...data,
      images,
      features: data.description ? data.description.split(',').map((f: string) => f.trim()).filter((f: string) => f.length > 0) : []
    };
    
    if (editingCar) {
      updateCar({ id: editingCar.id, data: formattedData }, {
        onSuccess: () => {
          toast({ title: "Car Updated" });
          setShowForm(false);
          setEditingCar(null);
        }
      });
    } else {
      createCar(formattedData, {
        onSuccess: () => {
          toast({ title: "Car Created" });
          setShowForm(false);
          form.reset();
        }
      });
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Rental Cars</h2>
          <p className="text-slate-500 text-sm">Update and manage your rental vehicle fleet</p>
        </div>
        <button onClick={() => { setEditingCar(null); setShowForm(true); }} className="flex items-center text-sm bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Plus className="w-5 h-5 mr-1.5" /> Add New Car
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-slate-900">{editingCar ? "Edit Car" : "Add New Car"}</h3>
              <button onClick={() => { setShowForm(false); setEditingCar(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Vehicle Name</label>
                  <input {...form.register("name")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Tesla Model 3" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Category</label>
                    <select {...form.register("category")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                      <option value="economy">Economy</option>
                      <option value="luxury">Luxury</option>
                      <option value="4x4">4x4 / SUV</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Price/Day</label>
                    <input type="number" {...form.register("pricePerDay", { valueAsNumber: true })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Main Image URL</label>
                  <input {...form.register("imageUrl")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="https://..." />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Additional Images</label>
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <input
                          {...form.register(`images.${index}` as any)}
                          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="Additional image URL..."
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2.5 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => append("")}
                      className="flex items-center gap-2 text-sm text-primary font-bold hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Add Another Image
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description & Features</label>
                  <textarea {...form.register("description")} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows={4} placeholder="Detailed description of features like Autopilot, Bluetooth, Sunroof, etc..." />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowForm(false); setEditingCar(null); }} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={isCreating || isUpdating} className="flex-[2] py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50">
                    {isCreating || isUpdating ? <Loader2 className="animate-spin mx-auto w-5 h-5"/> : editingCar ? "Update Vehicle" : "Add Vehicle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 -mx-6 md:mx-0 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-50/50 border-y border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-900">Vehicle</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Category</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Price/Day</th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cars?.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                      <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold text-slate-900">{c.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.category === 'luxury' ? 'bg-purple-100 text-purple-700' : c.category === '4x4' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
                    {c.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-slate-700">
                  ${c.pricePerDay}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => { setEditingCar(c); setShowForm(true); }} className="text-slate-400 hover:text-primary hover:bg-primary/10 p-2.5 rounded-xl transition-all">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteCar(c.id)} className="text-slate-400 hover:text-destructive hover:bg-destructive/10 p-2.5 rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {cars?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  No vehicles found. Add your first car!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EnquiriesList() {
  const { data: enquiries, isLoading } = useEnquiries();

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Client Enquiries</h2>
        <p className="text-slate-500 text-sm">Review messages and requests from your customers</p>
      </div>
      <div className="grid gap-4">
        {enquiries?.map(e => (
          <div key={e.id} className="p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:bg-slate-50/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {e.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg">{e.name}</span>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <a href={`mailto:${e.email}`} className="hover:text-primary transition-colors">{e.email}</a>
                    {e.phone && <span>• {e.phone}</span>}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                {e.type.replace('-', ' ')}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed shadow-sm italic">
              "{e.message}"
            </div>
            <div className="mt-4 flex justify-end">
              <span className="text-[10px] text-slate-400 font-medium">
                Received on {new Date(e.createdAt || '').toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {enquiries?.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400">No enquiries received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
