import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import ItemForm from "./ItemForm"; // Ensure this is correctly imported
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const ItemDialog = ({
  isOpen,
  onClose,
  itemDetails,
  refId,
  mode,
  type,
  onSave,
}) => {
  const [itemData, setItemData] = useState(itemDetails || null);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchItemData = async () => {
      console.log("refId: ", refId);
      console.log("itemDetails: ", itemDetails);
      if (refId && !itemDetails) {
        setLoading(true);
        try {
          const itemRef = doc(db, `sawmill/${sawmillId}/${type}s`, refId);
          const itemSnap = await getDoc(itemRef);

          if (itemSnap.exists()) {
            setItemData({ id: itemSnap.id, ...itemSnap.data() });
          } else {
            alert(`${type} not found!`);
            onClose();
          }
        } catch (error) {
          console.error(`Error fetching ${type} data:`, error);
          alert(`Failed to load ${type} details.`);
        }
        setLoading(false);
      }
    };

    fetchItemData();

    if (mode === "add") {
      setItemData({
        refId: "",
        speciesName: "",
        // Add default fields as necessary for each type
      });
    }
  }, [refId, itemDetails, mode, type, db, onClose]);

  useEffect(() => {
    setItemData(itemDetails); // Reset itemData when itemDetails change
  }, [itemDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (updatedItemData) => {
    // Logic to save or update the item
    onSave(updatedItemData);
  };

  const handlePlankEditClick = () => {
    onClose();
    navigate(`/editplank/${itemData.id}`);
  };

  const handleLogEditClick = () => {
    onClose();
    navigate(`/editlog/${itemData.id}`);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {/* <DialogTitle>
        {mode === "view"
          ? `View ${type}`
          : mode === "edit"
          ? `Edit ${type}`
          : `Add New ${type}`}
      </DialogTitle> */}
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
        {mode !== "view" && (
          <Button color="primary" onClick={() => handleSave(itemData)}>
            Save
          </Button>
        )}
        {type == "plank" && (
          <Button color="primary" onClick={handlePlankEditClick}>
            Edit
          </Button>
        )}
        {type == "log" && (
          <Button color="primary" onClick={handleLogEditClick}>
            Edit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;
