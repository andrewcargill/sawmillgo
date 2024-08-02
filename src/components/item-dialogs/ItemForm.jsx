import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase-config";
import PlankForm from "./form-templates/PlankForm";
import TreeForm from "./form-templates/TreeForm";
import LogForm from "./form-templates/LogForm";
import { CircularProgress, Typography } from "@mui/material";

const ItemForm = ({ type, itemDetails, onChange, onSave, mode }) => {
  const [itemData, setItemData] = useState(itemDetails || {});
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSpecies, fetchedLocations, fetchedProjects] =
          await Promise.all([
            fetchSpeciesForSawmill(db, sawmillId),
            fetchLocationsForSawmill(db, sawmillId),
            fetchProjectsForSawmill(db, sawmillId, itemDetails?.verified || false),
          ]);

        setSpecies(fetchedSpecies);
        setLocations(fetchedLocations);
        setProjects(
          fetchedProjects.map((project) => ({
            id: project.id,
            name: project.projectName,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load additional data.");
        setLoading(false);
      }
    };

    if (sawmillId) {
      fetchData();
    }
  }, [db, sawmillId, itemDetails?.verified]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    let actualValue;

    switch (type) {
      case "checkbox":
        actualValue = checked;
        break;
      case "number":
        actualValue = value === "" ? "" : parseFloat(value);
        if (isNaN(actualValue)) {
          actualValue = value;
        }
        break;
      default:
        actualValue = value;
        break;
    }

    setItemData((prev) => ({
      ...prev,
      [name]: actualValue,
    }));
    onChange({ name, value: actualValue });
  };

  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    const baseName = name.slice(0, -2);
    const selectedItem = data.find((item) => item.id === value);
    setItemData((prev) => ({
      ...prev,
      [name]: value,
      [`${baseName}Name`]: selectedItem ? selectedItem.name : "",
    }));
  };

  const handleFileChange = (name, file) => {
    setImageFiles((prev) => ({ ...prev, [name]: file }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `${type}s/${sawmillId}/${file.name}_${new Date().getTime()}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newImage1Url = imageFiles.image1
        ? await uploadImage(imageFiles.image1)
        : null;
      const newImage2Url = imageFiles.image2
        ? await uploadImage(imageFiles.image2)
        : null;

      const updateData = {
        ...itemData,
        ...(newImage1Url ? { image1: newImage1Url } : {}),
        ...(newImage2Url ? { image2: newImage2Url } : {}),
      };

      if (mode === "edit") {
        const itemRef = doc(db, `sawmill/${sawmillId}/${type}s`, itemData.id);
        await updateDoc(itemRef, updateData);
        alert(`${type} updated successfully!`);
      } else if (mode === "add") {
        const collectionRef = collection(db, `sawmill/${sawmillId}/${type}s`);
        await addDoc(collectionRef, updateData);
        alert(`${type} added successfully!`);
      }
      onSave(updateData);
    } catch (error) {
      console.error(`Failed to ${mode} ${type}:`, error);
      alert(`Error ${mode}ing ${type}.`);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body2" color="error">{error}</Typography>;
  }

  const commonProps = {
    onChange: handleInputChange,
    onSelectChange: handleSelectChange,
    onFileChange: handleFileChange,
    onSubmit: handleSubmit,
    mode: mode,
  };

  switch (type) {
    case "tree":
      return (
        <TreeForm
          tree={itemData}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
      );
    case "log":
      return (
        <LogForm
          log={itemData}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
      );
    case "plank":
      return (
        <PlankForm
          plank={itemData}
          species={species}
          locations={locations}
          projects={projects}
          {...commonProps}
        />
      );
    default:
      return <p>Unknown item type</p>;
  }
};

export default ItemForm;
