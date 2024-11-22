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
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase-config";

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
          const itemRef = doc(db, `sawmill/${sawmillId}/${type}s`, refId);
          const itemSnap = await getDoc(itemRef);

          if (itemSnap.exists()) {
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
            alert(`${type} not found.`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        border: `5px solid ${theme.palette.primary.main}`, // Use secondary.main
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
          <Button color="primary" onClick={() => setMode("edit")}>
            Edit
          </Button>
        )}
        {mode === "edit" && (
          <Button
            color="primary"
            onClick={handleSave}
            disabled={!itemData}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;
