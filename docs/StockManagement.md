# Stock Management

## Component Relationships

### StockSearchWidget
- Displays a list of stock items (trees, logs, planks).
- Opens `ItemDialog` when an item is clicked.

### ItemDialog
- Displays a dialog with `ItemForm` for viewing, editing, or adding items.
- Passes the item details and type to `ItemForm`.

### ItemForm
- Renders the appropriate form (`LogForm`, `TreeForm`, `PlankForm`) based on the item type.
- Passes the item details and other props to the specific form component.

### LogForm
- The form component for editing or adding log details.
- Receives props from `ItemForm`.

## Example Code Flow

### `StockSearchWidget.jsx`


```jsx
import React, { useState } from 'react';
import ItemDialog from '../item-dialogs/ItemDialog';

const StockSearchWidget = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogMode, setDialogMode] = useState('view');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  return (
    <div>
      {/* Render stock items */}
      <ItemDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        itemDetails={selectedItem}
        mode={dialogMode}
        type="log" // Example type
        onSave={() => {/* handle save */}}
      />
    </div>
  );
};

export default StockSearchWidget; ```

### `ItemDialog.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

const ItemDialog = ({ isOpen, onClose, itemDetails, mode, type, onSave }) => {
  const [itemData, setItemData] = useState(itemDetails);

  useEffect(() => {
    if (isOpen) {
      setItemData(itemDetails);
    }
  }, [isOpen, itemDetails]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <ItemForm
        type={type}
        itemDetails={itemData}
        onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })}
        onSave={onSave}
        mode={mode}
      />
    </Dialog>
  );
};

export default ItemDialog;
