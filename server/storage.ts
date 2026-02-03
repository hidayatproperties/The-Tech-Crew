import { users, properties, cars, enquiries, type User, type InsertUser, type Property, type InsertProperty, type Car, type InsertCar, type Enquiry, type InsertEnquiry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property>;
  deleteProperty(id: number): Promise<void>;

  getCars(): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: number, car: Partial<InsertCar>): Promise<Car>;
  deleteCar(id: number): Promise<void>;

  getEnquiries(): Promise<Enquiry[]>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateUserPassword(id: number, passwordHash: string): Promise<void>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    return property;
  }

  async updateProperty(id: number, partialProperty: Partial<InsertProperty>): Promise<Property> {
    const results = await db
      .update(properties)
      .set(partialProperty)
      .where(eq(properties.id, id))
      .returning();
    const property = results[0];
    if (!property) throw new Error("Property not found");
    return property;
  }

  async deleteProperty(id: number): Promise<void> {
    await db.delete(properties).where(eq(properties.id, id));
  }

  async getCars(): Promise<Car[]> {
    return await db.select().from(cars);
  }

  async getCar(id: number): Promise<Car | undefined> {
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car;
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const [car] = await db.insert(cars).values(insertCar).returning();
    return car;
  }

  async updateCar(id: number, partialCar: Partial<InsertCar>): Promise<Car> {
    const results = await db
      .update(cars)
      .set(partialCar)
      .where(eq(cars.id, id))
      .returning();
    const car = results[0];
    if (!car) throw new Error("Car not found");
    return car;
  }

  async deleteCar(id: number): Promise<void> {
    await db.delete(cars).where(eq(cars.id, id));
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return await db.select().from(enquiries);
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const [enquiry] = await db.insert(enquiries).values(insertEnquiry).returning();
    return enquiry;
  }

  async updateUserPassword(id: number, passwordHash: string): Promise<void> {
    await db.update(users).set({ password: passwordHash }).where(eq(users.id, id));
  }
}

export const storage = new DatabaseStorage();
