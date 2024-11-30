import React, { useState, useEffect } from "react";
import TreemapComponent from "./TreemapComponent";
import { fetchHierarchyData } from "./FetchHierarchyData";
import ItemDialog from "../item-dialogs/ItemDialog";

const TreemapView = () => {
  const [hierarchyData, setHierarchyData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRefId, setSelectedRefId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHierarchyData();
        setHierarchyData(data);
      } catch (error) {
        console.error("Error fetching hierarchy data:", error);
      }
    };

    loadData();
  }, []);

  const handleNodeClick = (type, itemDetails) => {
    setSelectedType(type);
    setSelectedItem(itemDetails);
    setSelectedRefId(itemDetails.name);
    setDialogOpen(true);
    console.log("Node clicked:", type, itemDetails);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedType(null);
    setSelectedItem(null);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Logs and Planks Treemap</h1>
      {hierarchyData ? (
        <>
          <TreemapComponent data={hierarchyData} onNodeClick={handleNodeClick} />
          <ItemDialog
            isOpen={dialogOpen}
            onClose={handleDialogClose}
            refId={selectedRefId}
            type={selectedType}
            mode="view"
          />
        </>
      ) : (
        <p>Loading hierarchy data...</p>
      )}
    </div>
  );
};

export default TreemapView;
