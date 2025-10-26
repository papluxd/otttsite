import { MongoClient, ObjectId } from "mongodb";
import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import type { IStorage } from "./storage";

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private dbName: string = "subflix";
  
  constructor() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is required. Please set it in Replit Secrets.");
    }
    this.client = new MongoClient(MONGODB_URI);
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to MongoDB successfully!");
  }

  private get db() {
    return this.client.db(this.dbName);
  }

  private get usersCollection() {
    return this.db.collection<User>("users");
  }

  private get productsCollection() {
    return this.db.collection<Product>("products");
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await this.usersCollection.findOne({ id });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersCollection.findOne({ username });
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = new ObjectId().toString();
    const user: User = { ...insertUser, id };
    await this.usersCollection.insertOne(user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return await this.productsCollection.find({}).toArray();
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const product = await this.productsCollection.findOne({ id });
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.productsCollection.find({ category }).toArray();
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = new ObjectId().toString();
    const product: Product = { ...insertProduct, id };
    await this.productsCollection.insertOne(product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await this.productsCollection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return result || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productsCollection.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
