import { collection, query, getDocs } from 'firebase/firestore';

/**
 * Fetches locations for a given sawmill ID.
 * @param {Firestore} db The Firestore database instance.
 * @param {string} sawmillId The ID of the sawmill for which to fetch locations.
 * @returns {Promise<Array>} A promise that resolves to an array of locations.
 */
export const fetchLocationsForSawmill = async (db, sawmillId) => {
  try {
    const locationsQuery = query(collection(db, `sawmill/${sawmillId}/locations`));
    const querySnapshot = await getDocs(locationsQuery);
    const locations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("Failed to fetch locations.");
  }
};
