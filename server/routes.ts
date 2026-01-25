import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Auth (Passport session)
  setupAuth(app);

  // === Properties ===
  app.get(api.properties.list.path, async (req, res) => {
    const properties = await storage.getProperties();
    let filtered = properties;
    const type = req.query.type as string;
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    res.json(filtered);
  });

  app.get(api.properties.get.path, async (req, res) => {
    const property = await storage.getProperty(Number(req.params.id));
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  });

  app.post(api.properties.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.properties.create.input.parse(req.body);
    const property = await storage.createProperty(input);
    res.status(201).json(property);
  });

  app.put(api.properties.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.properties.update.input.parse(req.body);
    const property = await storage.updateProperty(Number(req.params.id), input);
    res.json(property);
  });

  app.delete(api.properties.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    await storage.deleteProperty(Number(req.params.id));
    res.status(204).send();
  });

  // === Cars ===
  app.get(api.cars.list.path, async (req, res) => {
    const cars = await storage.getCars();
    let filtered = cars;
    const category = req.query.category as string;
    if (category) {
      filtered = filtered.filter(c => c.category === category);
    }
    res.json(filtered);
  });

  app.post(api.cars.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.cars.create.input.parse(req.body);
    const car = await storage.createCar(input);
    res.status(201).json(car);
  });

  app.put("/api/cars/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const car = await storage.updateCar(Number(req.params.id), req.body);
    res.json(car);
  });

  app.delete(api.cars.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    await storage.deleteCar(Number(req.params.id));
    res.status(204).send();
  });

  // === Enquiries ===
  app.post(api.enquiries.create.path, async (req, res) => {
    try {
      const input = api.enquiries.create.input.parse(req.body);
      const enquiry = await storage.createEnquiry(input);
      res.status(201).json(enquiry);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.get(api.enquiries.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const enquiries = await storage.getEnquiries();
    res.json(enquiries);
  });

  // Seed Data
  await seedDatabase();

  const httpServer = createServer(app);
  return httpServer;
}

import { hashPassword } from "./auth";

async function seedDatabase() {
  const existingUser = await storage.getUserByUsername("admin");
  if (!existingUser) {
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      isAdmin: true
    });
  }

  const existingProps = await storage.getProperties();
  if (existingProps.length === 0) {
    await storage.createProperty({
      title: "Modern Apartment in Downtown",
      description: "Luxurious 2 bedroom apartment with city views.",
      type: "rent",
      location: "Downtown",
      price: 2500,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800"],
      specs: { bedrooms: 2, bathrooms: 2, area: 1200 },
      features: ["Gym", "Pool", "Parking"],
      isFeatured: true
    });
    await storage.createProperty({
      title: "Spacious Family Villa",
      description: "5 bedroom villa with private garden.",
      type: "buy",
      location: "Suburbs",
      price: 1500000,
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800"],
      specs: { bedrooms: 5, bathrooms: 4, area: 4000 },
      features: ["Garden", "Garage", "Smart Home"],
      isFeatured: true
    });
  }

  const existingCars = await storage.getCars();
  if (existingCars.length === 0) {
    await storage.createCar({
      name: "Tesla Model 3",
      category: "luxury",
      pricePerDay: 150,
      imageUrl: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800",
      images: ["https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800"],
      features: ["Autopilot", "Electric", "GPS"],
      isAvailable: true
    });
    await storage.createCar({
      name: "Toyota Corolla",
      category: "economy",
      pricePerDay: 40,
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800",
      images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800"],
      features: ["Bluetooth", "AC"],
      isAvailable: true
    });
  }
}
