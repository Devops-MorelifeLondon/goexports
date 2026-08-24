import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Load .env variables manually if not loaded
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/goexports";
const MONGODB_DB = process.env.MONGODB_DB || "goexports";

const BUYER_PLANS = [
  {
    id: "free",
    slug: "free",
    name: "Free",
    tagline: "Start exploring international markets",
    price: 0,
    priceDisplay: "0",
    currency: "£",
    period: "/ month",
    leads: 5,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "24/7/365 Support",
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "starter",
    slug: "starter",
    name: "Starter",
    tagline: "Perfect for new exporters",
    price: 249,
    priceDisplay: "249",
    currency: "£",
    period: "/ month",
    leads: 20,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "growth",
    slug: "growth",
    name: "Growth",
    tagline: "Most popular for scaling",
    price: 499,
    priceDisplay: "499",
    currency: "£",
    period: "/ month",
    leads: 50,
    leadsLabel: "Qualified Leads / Month",
    featured: true,
    badge: "⭐ Most Popular",
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "enterprise",
    slug: "enterprise",
    name: "Enterprise",
    tagline: "For established businesses",
    price: 999,
    priceDisplay: "999",
    currency: "£",
    period: "/ month",
    leads: 120,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
    isActive: true,
    sortOrder: 4,
  },
];

async function runSeed() {
  console.log(" Connecting to MongoDB at:", MONGODB_URI);
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const collection = db.collection("packages");

    console.log(` Seeding ${BUYER_PLANS.length} packages into '${MONGODB_DB}.packages'...`);

    for (const plan of BUYER_PLANS) {
      const now = new Date().toISOString();
      await collection.updateOne(
        { id: plan.id },
        {
          $set: {
            ...plan,
            updatedAt: now,
          },
          $setOnInsert: {
            createdAt: now,
          },
        },
        { upsert: true }
      );
      console.log(` ✓ Seeded package: ${plan.name} (£${plan.price}/mo, ${plan.leads} leads)`);
    }

    // Create index on id and sortOrder
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ sortOrder: 1 });

    const totalCount = await collection.countDocuments();
    console.log(`🎉 Database seeding completed! Total packages in DB: ${totalCount}`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await client.close();
  }
}

runSeed();
