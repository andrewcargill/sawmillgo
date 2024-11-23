# Help Document for Sawmill Go System

## Routes


### Authentication
- `/login`: Renders `Login` component
- `/creatorlogin`: Renders `CreatorLogin` component
- `/signup`: Renders `SignUpComponent` component

### User Pages
- `/home`: Renders `UserHomePage` component
- `/creatorhome`: Renders `CreatorHomePage` component
- `/loggedoutpage`: Renders `LoggedOutPage` component
- `/profile`: Renders `UserProfilePage` component
- `/creatorprofile/:creatorId`: Renders `CreatorProfile` component

### Product Management
- `/product/:projectId`: Renders `ProductForm` component

### Sawmill Management
- `/addsawmill`: Renders `AddSawmillForm` component
- `/edit-sawmill`: Renders `EditSawmillForm` component
- `/sawmill-details`: Renders `SawmillDetails` component

### Tree Management
- `/addtree`: Renders `AddTreeForm` component
- `/trees`: Renders `TreesPage` component

### Log Management
- `/logs`: Renders `LogsPage` component
- `/log/:logId`: Renders `LogDetails` component
- `/editlog/:logId`: Renders `EditLog` component
- `/addlog`: Renders `AddLog` component

### Plank Management
- `/planks`: Renders `PlanksPage` component
- `/plank/:plankId`: Renders `PlankDetails` component
- `/editplank/:plankId`: Renders `EditPlank` component
- `/addplank`: Renders `AddPlank` component
- `/monitorplank/:plankId`: Renders `AddMoistureCheck` component

## Component Relationships

### Stock Management - Dev

- [Stock Management](StockManagement.md)

### Authentication

- [Authentication](Authentication.md)

### User Pages

- [User Pages](UserPages.md)

### Product Management

- [Product Management](ProductManagement.md)

### Sawmill Management

- [Sawmill Management](SawmillManagement.md)

### Tree Management

- [Tree Management](TreeManagement.md)

### Log Management

- [Log Management](LogManagement.md)

### Plank Management

- [Plank Management](PlankManagement.md)

### Navigation

- [Navigation](Navigation.md)