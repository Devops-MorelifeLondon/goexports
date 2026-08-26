import { NextResponse } from "next/server";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import { ExportProfile, connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

// Helper to find exporter document for session
async function findExporterDoc(session: { id?: string; email?: string; slug?: string }) {
  await connectToDatabase();
  let userDoc: any = null;

  const activeFilter = {
    isDeleted: { $ne: true },
    status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
  };

  if (session.id) {
    userDoc = await ExportProfile.findOne({ id: session.id, ...activeFilter });
    if (!userDoc && mongoose.isValidObjectId(session.id)) {
      userDoc = await ExportProfile.findOne({ _id: new mongoose.Types.ObjectId(session.id), ...activeFilter });
    }
  }
  if (!userDoc && session.email) {
    userDoc = await ExportProfile.findOne({ email: session.email.toLowerCase(), ...activeFilter });
  }

  return userDoc;
}

// ── POST: Add New Product ──
export async function POST(req: Request) {
  try {
    const session = await getExporterSessionFromRequest();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to manage your products." },
        { status: 401 }
      );
    }

    const userDoc = await findExporterDoc(session);
    if (!userDoc) {
      return NextResponse.json({ error: "Exporter profile not found" }, { status: 44 });
    }

    const body = await req.json();
    const { title, description, category, price, moq, imageUrl, imageKey } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Validation failed", message: "Product title is required." },
        { status: 400 }
      );
    }

    const newProduct = {
      id: `PROD-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category ? category.trim() : userDoc.productCategory || "",
      price: price ? price.trim() : "",
      moq: moq ? moq.trim() : "",
      imageUrl: imageUrl ? imageUrl.trim() : "",
      imageKey: imageKey ? imageKey.trim() : "",
      createdAt: new Date().toISOString(),
    };

    if (!Array.isArray(userDoc.products)) {
      userDoc.products = [];
    }

    userDoc.products.unshift(newProduct);
    userDoc.updatedAt = new Date().toISOString();
    await userDoc.save();

    console.log("=== [NEW PRODUCT ADDED] ===", {
      exporterId: userDoc.id,
      productId: newProduct.id,
      title: newProduct.title,
      imageUrl: newProduct.imageUrl ? "Uploaded to ImageKit" : "None",
    });

    return NextResponse.json({
      success: true,
      message: "Product added successfully to your exporter catalog!",
      product: newProduct,
      products: userDoc.products,
    });
  } catch (error: any) {
    console.error("Add product error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to add product." },
      { status: 500 }
    );
  }
}

// ── PUT: Update Product ──
export async function PUT(req: Request) {
  try {
    const session = await getExporterSessionFromRequest();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to manage products." },
        { status: 401 }
      );
    }

    const userDoc = await findExporterDoc(session);
    if (!userDoc) {
      return NextResponse.json({ error: "Exporter profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { id, title, description, category, price, moq, imageUrl, imageKey } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Product title is required" }, { status: 400 });
    }

    const existingProducts: any[] = Array.isArray(userDoc.products) ? userDoc.products : [];
    const prodIdx = existingProducts.findIndex((p) => p.id === id);

    if (prodIdx === -1) {
      return NextResponse.json({ error: "Product not found in your catalog" }, { status: 404 });
    }

    existingProducts[prodIdx] = {
      ...existingProducts[prodIdx],
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category ? category.trim() : existingProducts[prodIdx].category || "",
      price: price ? price.trim() : "",
      moq: moq ? moq.trim() : "",
      imageUrl: imageUrl !== undefined ? imageUrl.trim() : existingProducts[prodIdx].imageUrl || "",
      imageKey: imageKey !== undefined ? imageKey.trim() : existingProducts[prodIdx].imageKey || "",
      updatedAt: new Date().toISOString(),
    };

    userDoc.products = existingProducts;
    userDoc.updatedAt = new Date().toISOString();
    await userDoc.save();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully!",
      product: existingProducts[prodIdx],
      products: userDoc.products,
    });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to update product." },
      { status: 500 }
    );
  }
}

// ── DELETE: Delete Product ──
export async function DELETE(req: Request) {
  try {
    const session = await getExporterSessionFromRequest();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to delete products." },
        { status: 401 }
      );
    }

    const userDoc = await findExporterDoc(session);
    if (!userDoc) {
      return NextResponse.json({ error: "Exporter profile not found" }, { status: 404 });
    }

    const url = new URL(req.url);
    let productId = url.searchParams.get("id");

    if (!productId) {
      try {
        const body = await req.json();
        productId = body.id;
      } catch {}
    }

    if (!productId) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    const existingProducts: any[] = Array.isArray(userDoc.products) ? userDoc.products : [];
    const filteredProducts = existingProducts.filter((p) => p.id !== productId);

    userDoc.products = filteredProducts;
    userDoc.updatedAt = new Date().toISOString();
    await userDoc.save();

    return NextResponse.json({
      success: true,
      message: "Product removed from catalog successfully!",
      products: userDoc.products,
    });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to delete product." },
      { status: 500 }
    );
  }
}
