import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/goexports";
const dbName = process.env.MONGODB_DB || "goexports";

const options = {
  serverSelectionTimeoutMS: 2500, // Fast timeout if MongoDB is not running locally during build
  connectTimeoutMS: 2500,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const clientInstance = await clientPromise;
  return clientInstance.db(dbName);
}

export const getDb = getDatabase;

export async function getExportProfilesCollection() {
  const db = await getDatabase();
  return db.collection("export_profiles");
}

export async function getPackagesCollection() {
  const db = await getDatabase();
  return db.collection("packages");
}

export default clientPromise;
