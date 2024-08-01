import React, { useState } from 'react';
import { Modal, Button, Grid } from '@mui/material';
import ItemForm from './ItemForm';

// Define initial data structure for each type
const initialData = {
  tree: { speciesName: '', age: '', location: '', status: 'available' },
  log: { length: '', diameter: '', treeId: '' },
  plank: { width: '', thickness: '', material: '' },
};

const ItemManager = () => {
  const [mode, setMode] = useState('view'); // 'view', 'edit', or 'add'
  const [type, setType] = useState('tree'); // 'tree', 'log', or 'plank'
  const [data, setData] = useState(initialData[type]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with specific mode and type
  const openModal = (itemType, itemMode, itemData = null) => {
    setType(itemType);
    setMode(itemMode);
    setData(itemData || initialData[itemType]);
    setIsModalOpen(true);
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Example buttons to trigger modal */}
      <Button onClick={() => openModal('tree', 'add')}>Add Tree</Button>
      <Button onClick={() => openModal('log', 'view', { length: 12, diameter: 3, treeId: '123' })}>
        View Log
      </Button>
      <Button onClick={() => openModal('plank', 'edit', { width: 10, thickness: 2, material: 'Oak' })}>
        Edit Plank
      </Button>

      {/* Modal for displaying forms */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Grid
          container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ItemForm
            type={type}
            mode={mode}
            data={data}
            onChange={(newData) => setData(newData)}
          />
          <Grid container justifyContent="flex-end" mt={2}>
            {mode !== 'view' && (
              <Button variant="contained" onClick={closeModal}>
                Save
              </Button>
            )}
            <Button variant="outlined" onClick={closeModal} sx={{ ml: 2 }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ItemManager;
