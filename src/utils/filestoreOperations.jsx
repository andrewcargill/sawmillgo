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

export const fetchProjectsForSawmill = async (db, sawmillId) => {
    try {
      const projectsQuery = query(collection(db, `sawmill/${sawmillId}/projects`));
      const querySnapshot = await getDocs(projectsQuery);
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects.");
    }
  };

export const fetchSpeciesForSawmill = async (db, sawmillId) => {
    try {
      const speciesQuery = query(collection(db, `sawmill/${sawmillId}/species`));
      const querySnapshot = await getDocs(speciesQuery);
      const speices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return speices;
    } catch (error) {
      console.error("Error fetching species:", error);
      throw new Error("Failed to fetch species.");
    }
  };