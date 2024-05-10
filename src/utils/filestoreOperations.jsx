import { collection, query, getDocs, where } from 'firebase/firestore';

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

export const fetchVerifiedProjectsForSawmill = async (db, sawmillId) => {
  try {
      const projectsQuery = query(
          collection(db, `sawmill/${sawmillId}/projects`),
          where("verified", "==", true) // Filter for verified projects only
      );
      const querySnapshot = await getDocs(projectsQuery);
      return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));
  } catch (error) {
      console.error("Error fetching verified projects:", error);
      throw new Error("Failed to fetch verified projects.");
  }
};


export const fetchProjectsForSawmill = async (db, sawmillId, isVerified) => {
  try {
    const projectsQuery = query(
      collection(db, `sawmill/${sawmillId}/projects`),
      where("verified", "==", isVerified)
    );
    const querySnapshot = await getDocs(projectsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
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

  export const fetchCreators = async (db) => {
    try {
      const usersQuery = query(
        collection(db, "users"),
        where("role", "==", "creator")
      );
      const querySnapshot = await getDocs(usersQuery);
      const creators = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return creators;
    } catch (error) {
      console.error("Error fetching creators:", error);
      throw new Error("Failed to fetch creators.");
    }
  };