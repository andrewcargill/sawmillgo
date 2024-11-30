import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ItemForm from "./ItemForm"; // Ensure this is correctly imported
import { app } from "../../firebase-config";
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const ItemDialog = ({
  isOpen,
  onClose,
  itemDetails,
  refId,
  mode: initialMode,
  type,
  onSave,
}) => {

  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialMode || "view");
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const theme = useTheme();

  useEffect(() => {
    const fetchItemData = async () => {
      if (itemDetails) {
        // Use provided itemDetails immediately
        setItemData(itemDetails);
        setLoading(false);
        return;
      }
  
      if (refId) {
        setLoading(true);
        try {
          // Query to find the document by the "refId" field
          console.log("Fetching item data...", refId);
          const collectionRef = collection(db, `sawmill/${sawmillId}/${type}s`);
          const queryRef = query(collectionRef, where("refId", "==", refId));
          const querySnap = await getDocs(queryRef);
  
          if (!querySnap.empty) {
            // Assuming "refId" is unique, we take the first document
            const itemSnap = querySnap.docs[0];
            const data = itemSnap.data();
  
            // Prefetch related logs and images (if applicable)
            const logs = data.logIds
              ? await Promise.all(
                  data.logIds.map(async (logId) => {
                    const logSnap = await getDoc(doc(db, `sawmill/${sawmillId}/logs`, logId));
                    return logSnap.exists() ? { id: logId, ...logSnap.data() } : null;
                  })
                )
              : [];
  
            setItemData({ id: itemSnap.id, ...data, logs });
          } else {
            alert(`${type} not found using refId: ${refId}`);
          }
        } catch (error) {
          console.error(`Error fetching ${type} data:`, error);
          alert("Failed to load item details. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
  
    if (isOpen) {
      setMode(initialMode || "view"); // Reset to view mode on open
      setItemData(null); // Clear stale data
      fetchItemData(); // Fetch or use provided data
    }
  }, [isOpen, refId, itemDetails, initialMode, type, db, sawmillId]);
  



const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const storage = getStorage(app);
    const fileRef = ref(storage, imageUrl);
    await deleteObject(fileRef);
    console.log("Image deleted successfully from storage.");
  } catch (error) {
    console.error("Error deleting image from storage:", error);
  }
};

  
  const uploadImage = async (file) => {
    if (!file) return null;
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `${type === "plank" ? "planks" : "trees"}/${sawmillId}/${file.name}_${new Date().getTime()}`
    );
  
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };
  
  

  
  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (files && files[0]) {
      // Handle image upload
      try {
        const currentImageUrl = itemData[name]; // Check current image URL
        if (currentImageUrl) {
          await deleteImage(currentImageUrl); // Delete the old image
        }
  
        const fileUrl = await uploadImage(files[0]); // Upload new image
        if (fileUrl) {
          setItemData((prevData) => ({
            ...prevData,
            [name]: fileUrl, // Update state with the new image URL
          }));
          alert(`Image ${name} uploaded successfully!`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    } else if (value === "" && name.startsWith("image")) {
      // Handle image deletion (only for image fields)
      const currentImageUrl = itemData[name];
      if (currentImageUrl) {
        await deleteImage(currentImageUrl); // Delete the file from storage
      }
  
      setItemData((prevData) => ({
        ...prevData,
        [name]: null, // Remove the image URL
      }));
      alert(`Image ${name} deleted successfully!`);
    } else {
      // Handle text input updates
      setItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  
  const handleSave = async () => {
    try {
      const updateData = { ...itemData }; // `itemData` contains the latest state
      const itemRef = doc(db, `sawmill/${sawmillId}/${type}s`, itemData.id);
      await updateDoc(itemRef, updateData); // Update the document in Firestore
      alert(`${type} updated successfully!`);
      setMode("view"); // Switch back to view mode
      onSave(updateData); // Optionally pass updated data to parent
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      alert(`Failed to save ${type}.`);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm"  sx={{
      "& .MuiPaper-root": {
        border: `2px solid`, // Use secondary.main
        borderRadius: "12px", // Optional: round the corners
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Optional: add a shadow
      },
    }}>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : itemData ? (
          <ItemForm
            type={type}
            itemDetails={itemData}
            onChange={handleInputChange}
            onSave={handleSave}
            mode={mode}
          />
        ) : (
          <CircularProgress />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {mode === "view" && (
          <Button color="primary" variant="contained" onClick={() => setMode("edit")}>
            Edit
          </Button>
        )}
        {mode === "edit" && (
          <Button
            color="primary"
            onClick={handleSave}
            disabled={!itemData}
            variant="contained"
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;