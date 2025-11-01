import { Databases, ID, Query, Models } from "appwrite";
import { client } from "@/lib/appwrite/client";

const databases = new Databases(client);

const DATABASE_ID = "68ebc29f0016ad5d9b56";

const COLLECTIONS = {
  TYPES: "types",
  RECAPS: "recaps"
} as const;

// ============ TYPE DEFINITIONS ============

export interface TypeProps {
  id: string;
  label: string;
  value: number;
}

export interface TypeCreateData {
  label: string;
  value: number;
}

export interface TypeUpdateData {
  label?: string;
  value?: number;
}

export interface RecapProps {
  id: string;
  user_id: string;
  amount: number;
  type: TypeProps | null;
  date: string;
  revenue: number;
}

export interface RecapCreateData {
  user_id: string;
  amount: number;
  type_id: string;
  date: string;
  revenue: number;
}

export interface RecapUpdateData {
  user_id?: string;
  amount?: number;
  type_id?: string;
  date?: string;
  revenue?: number;
}

interface TypeDocument extends Models.Document {
  label: string;
  value: number;
}

interface RecapDocument extends Models.Document {
  user_id: string;
  amount: number;
  type_id: string;
  date: string;
  revenue: number;
}

// ============ TYPES COLLECTION ============

/**
 * CREATE - Membuat Type baru
 */
async function createType(typeData: TypeCreateData): Promise<TypeProps> {
  try {
    const response = await databases.createDocument<TypeDocument>(
      DATABASE_ID,
      COLLECTIONS.TYPES,
      ID.unique(),
      {
        label: typeData.label,
        value: typeData.value
      }
    );
    return {
      id: response.$id,
      label: response.label,
      value: response.value
    };
  } catch (error) {
    console.error("Error creating type:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan semua Types
 */
async function getAllTypes(queries: string[] = []): Promise<TypeProps[]> {
  try {
    const response = await databases.listDocuments<TypeDocument>(
      DATABASE_ID,
      COLLECTIONS.TYPES,
      queries
    );
    return response.documents.map(doc => ({
      id: doc.$id,
      label: doc.label,
      value: doc.value
    }));
  } catch (error) {
    console.error("Error reading types:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Type berdasarkan ID
 */
async function getTypeById(typeId: string): Promise<TypeProps> {
  try {
    const response = await databases.getDocument<TypeDocument>(
      DATABASE_ID,
      COLLECTIONS.TYPES,
      typeId
    );
    return {
      id: response.$id,
      label: response.label,
      value: response.value
    };
  } catch (error) {
    console.error("Error reading type:", error);
    throw error;
  }
}

/**
 * UPDATE - Update Type
 */
async function updateType(
  typeId: string,
  typeData: TypeUpdateData
): Promise<TypeProps> {
  try {
    const response = await databases.updateDocument<TypeDocument>(
      DATABASE_ID,
      COLLECTIONS.TYPES,
      typeId,
      typeData
    );
    return {
      id: response.$id,
      label: response.label,
      value: response.value
    };
  } catch (error) {
    console.error("Error updating type:", error);
    throw error;
  }
}

/**
 * DELETE - Hapus Type
 */
async function deleteType(typeId: string): Promise<boolean> {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.TYPES, typeId);
    return true;
  } catch (error) {
    console.error("Error deleting type:", error);
    throw error;
  }
}

// ============ RECAPS COLLECTION ============

/**
 * CREATE - Membuat Recap baru
 */
async function createRecap(recapData: RecapCreateData): Promise<RecapProps> {
  try {
    const typeId = recapData.type_id;
    
    if (!typeId || typeof typeId !== "string") {
      throw new Error("Invalid type_id after update");
    }

    const type = await getTypeById(typeId);

    const response = await databases.createDocument<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      ID.unique(),
      {
        user_id: recapData.user_id,
        amount: recapData.amount,
        type_id: recapData.type_id,
        date: recapData.date,
        revenue: recapData.revenue
      }
    );

    return {
      id: response.$id,
      user_id: response.user_id,
      amount: response.amount,
      type: type,
      date: response.date,
      revenue: response.revenue
    };
  } catch (error) {
    console.error("Error creating recap:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan semua Recaps
 */
async function getAllRecaps(queries: string[] = []): Promise<RecapProps[]> {
  try {
    const response = await databases.listDocuments<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      queries
    );
    
    const types = await getAllTypes();
    const typesMap: Record<string, TypeProps> = {};
    types.forEach(type => {
      typesMap[type.id] = type;
    });

    return response.documents.map(doc => ({
      id: doc.$id,
      user_id: doc.user_id,
      amount: doc.amount,
      type: typesMap[doc.type_id] || null,
      date: doc.date,
      revenue: doc.revenue
    }));
  } catch (error) {
    console.error("Error reading recaps:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recap berdasarkan ID
 */
async function getRecapById(recapId: string): Promise<RecapProps> {
  try {
    const response = await databases.getDocument<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      recapId
    );

    const typeId = response.type_id;

    if (!typeId || typeof typeId !== "string") {
      throw new Error("Invalid type_id after update");
    }

    const type = await getTypeById(typeId);

    return {
      id: response.$id,
      user_id: response.user_id,
      amount: response.amount,
      type: type,
      date: response.date,
      revenue: response.revenue
    };
  } catch (error) {
    console.error("Error reading recap:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recaps berdasarkan User ID
 */
async function getRecapsByUserId(userId: string): Promise<RecapProps[]> {
  try {
    return await getAllRecaps([
      Query.equal("user_id", userId),
      Query.orderDesc("date")
    ]);
  } catch (error) {
    console.error("Error reading recaps by user:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recaps berdasarkan Type ID
 */
async function getRecapsByTypeId(typeId: string): Promise<RecapProps[]> {
  try {
    return await getAllRecaps([
      Query.equal("type_id", typeId),
      Query.orderDesc("date")
    ]);
  } catch (error) {
    console.error("Error reading recaps by type:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recaps berdasarkan rentang tanggal
 */
async function getRecapsByPeriod(
  startDate: string,
  endDate: string
): Promise<RecapProps[]> {
  try {
    return await getAllRecaps([
      Query.greaterThanEqual("date", startDate),
      Query.lessThanEqual("date", endDate),
      Query.orderDesc("date")
    ]);
  } catch (error) {
    console.error("Error reading recaps by date range:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recaps 7 hari terakhir berdasarkan User ID
 */
async function getRecentRecapsByUserId(userId: string): Promise<RecapProps[]> {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const startDate = sevenDaysAgo.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    const response = await databases.listDocuments<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      [
        Query.equal("user_id", userId),
        Query.greaterThanEqual("date", startDate),
        Query.lessThanEqual("date", endDate),
        Query.orderDesc("date")
      ]
    );

    const types = await getAllTypes();
    const typesMap: Record<string, TypeProps> = {};
    types.forEach(type => {
      typesMap[type.id] = type;
    });

    const recaps = response.documents.map(doc => ({
      id: doc.$id,
      user_id: doc.user_id,
      amount: doc.amount,
      type: typesMap[doc.type_id] || null,
      date: doc.date,
      revenue: doc.revenue
    }));

    return recaps;
  } catch (error) {
    console.error("Error reading recent recaps by user:", error);
    throw error;
  }
}

/**
 * READ - Mendapatkan Recaps berdasarkan User ID dan rentang tanggal, dikelompokkan per Type
 */
async function getRecapsByUserPeriodGroupedByType(
  userId: string,
  startDate: string,
  endDate: string
): Promise<Record<string, RecapProps[]>> {
  try {
    const response = await databases.listDocuments<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      [
        Query.equal("user_id", userId),
        Query.greaterThanEqual("date", startDate),
        Query.lessThanEqual("date", endDate),
        Query.orderDesc("date")
      ]
    );

    const types = await getAllTypes();
    const typesMap: Record<string, TypeProps> = {};
    types.forEach(type => {
      typesMap[type.id] = type;
    });

    const recaps = response.documents.map(doc => ({
      id: doc.$id,
      user_id: doc.user_id,
      amount: doc.amount,
      type: typesMap[doc.type_id] || null,
      date: doc.date,
      revenue: doc.revenue
    }));

    const groupedRecaps: Record<string, RecapProps[]> = {};

    recaps.forEach(recap => {
      if (recap.type) {
        const typeLabel = recap.type.label;
        if (!groupedRecaps[typeLabel]) {
          groupedRecaps[typeLabel] = [];
        }
        groupedRecaps[typeLabel].push(recap);
      } else {
        if (!groupedRecaps["Uncategorized"]) {
          groupedRecaps["Uncategorized"] = [];
        }
        groupedRecaps["Uncategorized"].push(recap);
      }
    });

    return groupedRecaps;
  } catch (error) {
    console.error("Error reading recaps grouped by type:", error);
    throw error;
  }
}

/**
 * UPDATE - Update Recap
 */
async function updateRecap(
  recapId: string,
  recapData: RecapUpdateData
): Promise<RecapProps> {
  try {
    const response = await databases.updateDocument<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      recapId,
      recapData
    );
    const typeId = recapData.type_id || response.type_id;

    if (!typeId || typeof typeId !== "string") {
      throw new Error("Invalid type_id after update");
    }

    const type = await getTypeById(typeId);

    return {
      id: response.$id,
      user_id: response.user_id,
      amount: response.amount,
      type: type,
      date: response.date,
      revenue: response.revenue
    };
  } catch (error) {
    console.error("Error updating recap:", error);
    throw error;
  }
}

/**
 * DELETE - Hapus Recap
 */
async function deleteRecap(recapId: string): Promise<boolean> {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.RECAPS, recapId);
    return true;
  } catch (error) {
    console.error("Error deleting recap:", error);
    throw error;
  }
}

/**
 * UTILITY - Hitung total revenue berdasarkan user
 */
async function getTotalRevenueByUser(userId: string): Promise<number> {
  try {
    const recaps = await getRecapsByUserId(userId);
    const total = recaps.reduce((sum, recap) => sum + recap.revenue, 0);
    return total;
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    throw error;
  }
}

/**
 * UTILITY - Hitung total revenue berdasarkan user dan rentang tanggal
 */
async function getTotalRevenueByUserByPeriod(
  userId: string,
  startDate: string,
  endDate: string
): Promise<number> {
  try {
    const response = await databases.listDocuments<RecapDocument>(
      DATABASE_ID,
      COLLECTIONS.RECAPS,
      [
        Query.equal("user_id", userId),
        Query.greaterThanEqual("date", startDate),
        Query.lessThanEqual("date", endDate)
      ]
    );

    const total = response.documents.reduce(
      (sum, doc) => sum + (doc.revenue || 0),
      0
    );

    return total;
  } catch (error) {
    console.error("Error calculating total revenue by period:", error);
    throw error;
  }
}

export {
  // Types
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
  // Recaps
  createRecap,
  getAllRecaps,
  getRecapById,
  getRecapsByUserId,
  getRecapsByTypeId,
  getRecapsByPeriod,
  getRecentRecapsByUserId,
  getRecapsByUserPeriodGroupedByType,
  updateRecap,
  deleteRecap,
  // Utilities
  getTotalRevenueByUser,
  getTotalRevenueByUserByPeriod,
  // Constants
  COLLECTIONS
};
