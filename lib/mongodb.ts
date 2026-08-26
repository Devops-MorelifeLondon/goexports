import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/goexports";
const dbName = process.env.MONGODB_DB || "goexports";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName,
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ── ExportProfile Schema ──
const ExportProfileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true },
    slug: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    country: { type: String, required: true },
    productCategory: { type: String, required: true },
    website: { type: String, default: "" },
    postCode: { type: String, required: true },
    companyProfile: { type: String, required: true },
    targetMarkets: { type: [String], default: [] },
    yearEstablished: { type: String, default: "" },
    exportCapacity: { type: String, default: "" },
    certifications: { type: [String], default: [] },
    products: {
      type: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, default: "" },
          category: { type: String, default: "" },
          price: { type: String, default: "" },
          moq: { type: String, default: "" },
          imageUrl: { type: String, default: "" },
          imageKey: { type: String, default: "" },
          createdAt: { type: String, default: () => new Date().toISOString() },
        },
      ],
      default: [],
    },
    selectedPackage: { type: String, default: "Verified Growth Pro" },
    status: { type: String, default: "pending", index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    syncedToJotform: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null, index: true },
    resetPasswordExpires: { type: Date, default: null },
    ipAddress: { type: String, default: "unknown" },
    userAgent: { type: String, default: "unknown" },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() },
  },
  { collection: "export_profiles", timestamps: false, strict: false }
);

// ── Package Schema ──
const PackageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    tagline: { type: String, default: "" },
    price: { type: Number, default: 0 },
    priceDisplay: { type: String, default: "0" },
    currency: { type: String, default: "£" },
    period: { type: String, default: "/ month" },
    leads: { type: Number, default: 0 },
    leadsLabel: { type: String, default: "Qualified Leads / Month" },
    featured: { type: Boolean, default: false },
    badge: { type: String },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 1 },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() },
  },
  { collection: "packages", timestamps: false, strict: false }
);

// ── SellerInquiry Schema ──
const SellerInquirySchema = new mongoose.Schema(
  {
    sellerId: { type: String, required: true, index: true },
    sellerCompanyName: { type: String, default: "" },
    sellerEmail: { type: String, required: true, index: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerPhone: { type: String, default: "" },
    buyerCountry: { type: String, default: "" },
    inquiryType: { type: String, default: "Bulk Order / RFQ" },
    quantity: { type: String, default: "" },
    message: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { collection: "seller_inquiries", timestamps: false, strict: false }
);

// ── ProductInquiry Schema (Dedicated Model for Product Inquiries) ──
const ProductInquirySchema = new mongoose.Schema(
  {
    productId: { type: String, default: "", index: true },
    productTitle: { type: String, required: true },
    sellerId: { type: String, default: "", index: true },
    sellerCompanyName: { type: String, default: "" },
    sellerEmail: { type: String, default: "", index: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: "" },
    quantity: { type: String, required: true },
    unit: { type: String, required: true },
    email: { type: String, default: "" }, // OPTIONAL
    message: { type: String, default: "" },
    receivedAt: { type: Date, default: Date.now },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { collection: "product_inquiries", timestamps: false, strict: false }
);

export const ExportProfile =
  mongoose.models.ExportProfile || mongoose.model("ExportProfile", ExportProfileSchema);

export const PackageModel =
  mongoose.models.Package || mongoose.model("Package", PackageSchema);

export const SellerInquiry =
  mongoose.models.SellerInquiry || mongoose.model("SellerInquiry", SellerInquirySchema);

export const ProductInquiry =
  mongoose.models.ProductInquiry || mongoose.model("ProductInquiry", ProductInquirySchema);

// Helper function to return native DB connection if needed
export async function getDatabase() {
  const conn = await connectToDatabase();
  return conn.connection.db;
}

export const getDb = getDatabase;

export async function getExportProfilesCollection() {
  await connectToDatabase();
  return ExportProfile.collection;
}

export async function getPackagesCollection() {
  await connectToDatabase();
  return PackageModel.collection;
}

export default connectToDatabase;
