import { MongoClient, ObjectId } from "mongodb";
import { type User, type InsertUser, type Product, type InsertProduct, type CustomPricingOption } from "@shared/schema";
import type { IStorage } from "./storage";

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private dbName: string = "subflix";
  
  constructor() {
    const MONGODB_URI = "mongodb+srv://404movie:404moviepass@cluster0.fca76c9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    const customOptions: CustomPricingOption[] = (insertProduct.customOptions ?? []) as CustomPricingOption[];
    const product: Product = { 
      ...insertProduct,
      id,
      inStock1Month: insertProduct.inStock1Month ?? true,
      inStock3Month: insertProduct.inStock3Month ?? true,
      inStock6Month: insertProduct.inStock6Month ?? true,
      inStock12Month: insertProduct.inStock12Month ?? true,
      customOptions,
    };
    await this.productsCollection.insertOne(product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const updateData: any = { ...updates };
    if (updates.customOptions !== undefined) {
      updateData.customOptions = updates.customOptions as CustomPricingOption[];
    }
    const result = await this.productsCollection.findOneAndUpdate(
      { id },
      { $set: updateData },
      { returnDocument: "after" }
    );
    return result || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productsCollection.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
