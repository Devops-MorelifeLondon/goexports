import { MongoClient } from "mongodb";

const uri = "mongodb+srv://devops:7EDeJe98eYPeI2Qu@cluster0.c9gv856.mongodb.net/goexports?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("goexports").collection("packages");

    const privatePlan = {
      id: "custom-mwetyan5",
      slug: "lite-intl-domestic",
      name: "Lite (Intl + Domestic)",
      tagline: "15 Leads (International + Domestic)",
      price: 10000,
      priceDisplay: "10,000",
      currency: "₹",
      period: "/ month",
      leads: 15,
      leadsLabel: "Qualified International & Domestic Leads / Month",
      featured: false,
      badge: "🔒 Private Plan",
      features: [
        "15 Verified Buyer Leads / mo",
        "International + Domestic Leads",
        "Direct Global & Indian Buyer Contact Details",
        "Category-Specific RFQs",
        "Dedicated Account Manager",
        "24/7/365 Dedicated Support",
      ],
      isActive: true,
      isCustom: true,
      planType: "export",
      sortOrder: 8,
      updatedAt: new Date().toISOString(),
    };

    const res = await collection.updateOne(
      { id: "custom-mwetyan5" },
      { $set: privatePlan },
      { upsert: true }
    );
    console.log("Upserted custom-mwetyan5:", res);

    const doc = await collection.findOne({ id: "custom-mwetyan5" });
    console.log("Verified in DB:", JSON.stringify(doc, null, 2));
  } finally {
    await client.close();
  }
}

run().catch(console.error);

