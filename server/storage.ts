import { db, pool } from "./db";
import {
  users, properties, cars, enquiries,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Car, type InsertCar,
  type Enquiry, type InsertEnquiry
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;

  // Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property>;
  deleteProperty(id: number): Promise<void>;

  // Cars
  getCars(): Promise<Car[]>;
  createCar(car: InsertCar): Promise<Car>;
  deleteCar(id: number): Promise<void>;

  // Enquiries
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  getEnquiries(): Promise<Enquiry[]>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // Auth
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties).orderBy(desc(properties.id));
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property> {
    const [updated] = await db.update(properties).set(updates).where(eq(properties.id, id)).returning();
    return updated;
  }

  async deleteProperty(id: number): Promise<void> {
    await db.delete(properties).where(eq(properties.id, id));
  }

  // Cars
  async getCars(): Promise<Car[]> {
    return await db.select().from(cars).orderBy(desc(cars.id));
  }

  async createCar(car: InsertCar): Promise<Car> {
    const [newCar] = await db.insert(cars).values(car).returning();
    return newCar;
  }

  async deleteCar(id: number): Promise<void> {
    await db.delete(cars).where(eq(cars.id, id));
  }

  // Enquiries
  async createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry> {
    const [newEnquiry] = await db.insert(enquiries).values(enquiry).returning();
    return newEnquiry;
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
  }
}

export const storage = new DatabaseStorage();
