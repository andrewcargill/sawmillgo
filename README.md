# Help Document for Sawmill Go System

## 1. Introduction
### Purpose of the Document
This document is designed to guide you through the features and functionalities of the Sawmill Go system.

### System Overview
Sawmill Go offers an easy-to-use complete stock management system that tracks trees into logs and through to planks. It includes detailed management of storage locations, drying data, and project assignments.
Sawmill Go provides a complete story from forest to end product, including:
- A location map of where the tree stood.
- Detailed reports and information from every step of the journey.
- A creators' section featuring images of products in production.

Our goal was to create an intuitive system that simplifies tracking trees, logs, and planks. Much of the work occurs behind the scenes to ensure you always know what stock you have and where it is located. By storing each step of a tree’s journey to the end customer, you have access to accurate and detailed data.

The system focuses on the verified path from trees to end products, but also allows for seamless management of unverified logs and planks. The process includes:

1. **Tree:** We document the story of where the tree stood, reasons and timing for its removal, and details about who removed it.
2. **Log:** Each logged tree is entered into the system with details like date, length, and diameter recorded.
3. **Plank:** In the sawmill, each milled log is recorded with information on grade, possible use, images, date, and operator.
4. **Moisture Content:** Records of the moisture content for each plank are maintained over time.

### Interwoven Sub-Systems
- **Projects:** Manage the availability of a tree, log, or plank. Projects include details on allocated items, start date, deadline, and project information.
- **Locations:** Manage where each item is stored, including forest areas, drying areas, or sawmill processing/storage locations.
- **Users:** Store information about system users, their roles, and their activities, such as creating and modifying records.

### Verfied stock, Source transparency = Added value
You can use this system to simply take care of your stock but there is much more under the hood which is accessable to selective-cut and mixed-species wood stock.
- **Projects:** Along with the standard features of projects you can also allocate 'creators'. These are woodworkers who turn the wood stock into end products
- **Creators** Sawmill Go! has a dedicated login for creators who document thier creation process via image diary posts and also add images of the end product
- **End Reports:** A QR code is added to the end product which takes the customer to a web-page where all the information about the life journey of the wood is presented
- **Added Value:**  A true high-end product offering true transparency to the end customer. Meaning you can charge more for your verified wood-stock.



## 2. Getting Started
### System Requirements
The Sawmill Go system is 100% cloud based. The system is accessable via user login and will function on all devices.

### Installation Guide
You will be issued with a master-user account login. From here you can set up the following:
- **Users:** Add users and enable them to create user profiles. 
- **Species:** Add the tree speices you will be working with (This can be added - but species cannot be removed)
- **Locations:** Add various locations where you will be removing trees, storing logs and drying timber. 

### Initial Setup
### Sawmill Profile (Coming Soon)
This section will allow you to create a homepage to share your unique story about how you manage and source wood.

### UserProfile
Every user must have a username. Additionally, users can upload a profile image and be assigned specific roles within the system.

## 3. User Interface
### Dashboard Overview
You will see a home icon. This displays all components within Sawmill Go.
### Modules
This is the part of the software that will be used to add, view and manipulate stock within the sawmill.
* Trees - This is where you add, edit, delete and search trees
* Logs - This is where you add, edit, delete and search logs
* Planks - This is where you add, edit, delete and search planks / lumber
* Projects - Here you set add, edit, delete projects. Projects are used to manage reserving and allocating items (trees, logs & planks ) to customers

### Species
This setting allows you to define the tree species used within your system. You must add at least one species of tree before you can begin adding items.

### Locations
Configure various storage locations for any item. The system tracks movements between these locations to simplify item retrieval. These locations are also included in the end reports of verified projects.

### Projects
Projects are used to manage the status of items within the system. An item can be marked as 'available,' 'reserved,' or 'sold,' with its status automatically updated based on the associated project's status. Note: It is not necessary to have a project in order to use the system. However, projects are designated to manage either ONLY verified or unverified items, as verified reports are generated through projects.

### Tree Ages (Coming Soon)
Allows you to set a list of age ranges for trees that you remove from the forest (For example 20-50 years, 50-70 years). This restriction will enable the filtering and searching tree stocks by age.


## 3. User Interface
### Dashboard Overview
Description of the main areas of the user interface and what each section represents.

### Navigation
Instructions on how to navigate through the various sections of the system.

## 4. Core Features
### Feature Name
#### Purpose
What the feature is used for.

#### Detailed Instructions
How to use the feature, including step-by-step guidance.

#### Tips and Tricks
Additional tips for using the feature effectively.

## 5. Subsystems
### Projects
How to set up and manage projects within the system.

### Inventory Management
Instructions on managing inventory from trees to planks.

### Reporting
How to generate and interpret reports provided by the system.

## 6. Advanced Features
### Customizations
How users can customize their experience within the system.

### Integrations
Information on integrating the Sawmill Go system with other tools or systems.

### Automations
Steps to set up and use automations to streamline processes.

## 7. Account Management
### User Profiles
Instructions on creating and managing user profiles.

### Permissions and Roles
Guide on different user roles and the access permissions each role entails.

## 8. Troubleshooting
### Common Issues and Solutions
A list of frequently encountered issues and their solutions.

### Contact Support
Information on how and when to contact technical support.

## 9. Frequently Asked Questions (FAQ)
Answers to the most common questions users have about the Sawmill Go system.

## 10. Appendices
### Glossary
Definitions of technical terms used throughout this document.

### Legal and Compliance
Legal information and compliance guidelines relevant to the use of the system.

## 11. Feedback and Updates
### How to Provide Feedback
Instructions on how users can submit feedback about the system.

### Updating the System
Information on how and when system updates will be rolled out.


### Notes about the backend management of Creators
System Overview:
Collections and Sub-Collections Structure:

Sawmills Collection: Contains documents representing each sawmill.
Projects Sub-Collection: Each sawmill document has a sub-collection of projects. This is where projects specific to each sawmill are stored.
Users Collection: Separate collection where user profiles are stored, including sawmill workers and creators.
Creators: Not specifically a sub-collection, but creators are stored in the Users collection with a role type distinguishing them.
Creators and Projects:

Creator Allocation: Creators are assigned to projects within the sawmill's projects sub-collection. This assignment is likely managed through a field in the project documents that references the creator's user ID.
Project Management: Each project document might contain information about which creator is working on it, along with status updates and links to any content the creator produces.
Data Flow and Access Control:

Project Assignment: A creator is allocated to a project by a user with the necessary permissions within the sawmill system. This might involve selecting a creator from a list and assigning them to a project within the sawmill's project sub-collection.
Creator's View and Interactions: Once assigned, creators can access details of the project, update project status, and add content such as images, notes, or other updates.
Access Restrictions: Access to project details and the ability to make updates are likely controlled via Firestore security rules or programmatic checks within the application, ensuring that only assigned creators and authorized sawmill personnel can view or modify project details.
Creators' Work Reporting:

Detailed Project Documents: Each creator might maintain detailed records of their work within a dedicated sub-collection under their user document or linked directly within the project document, depending on how the data needs to be accessed and managed.
End Report Generation: Upon project completion, the system might generate a comprehensive report that includes all relevant data from both the sawmill and the creator's contributions. This could be achieved through cloud functions that aggregate and format data from multiple sources.
Interaction Example:
Project Creation: A sawmill user creates a project document within the sawmill's project sub-collection.
Creator Assignment: The project document is updated to include a reference to a creator's user ID, possibly within a field like assignedCreatorId.
Creator Access: The creator logs in, queries for projects where their user ID matches the assignedCreatorId, and accesses the project details.
Content Addition: The creator adds content to the project, either directly in the project document or within a separate collection linked to the project.
Reporting: On project completion, data from the project and any creator-specific contributions are compiled into a final report accessible to the sawmill and the creator.
This structure facilitates clear separation of roles and responsibilities while ensuring that data flow between creators and the sawmill system is streamlined and secure. The exact implementation details, such as how data is stored, queried, and secured, would depend on specific application requirements and Firestore configurations.


### Reports Generation Notes
The end product should display a QR Code. It is this QR code the the customer / product owner uses to access the report on the life journey of their product. The QR code will open a webpage where our system will populate a template with the data specific to that product. 

This is managed by the sawmill via Projects. This is where wood is allocated and then assigned to a creator to turn into the end product.


#### QR Code Generation
QR Codes are created via the projects module. On all verified projects you have the option to generate report. Here you can generate a QR code and view the end report. The module responsible for this is 'ProjectReportGenerator.jsx'
 


#### Live Product Report
The report retrieves data based on the planks allocated to the project. The report uses the following data collections: 
 - creators profile
 - creators diary entries for the project
 - creators description and hero image for the project
 - sawmill profile
 - plank data (images, miller, sawmill notes, drying information)
 - parent log data (date, length, location)
 - parent tree data (image, lumberjack, reason for milling, date, location)

The data is live, meaning that all updates to trees, logs, planks, sawmill and creator profiles and diary entries will effect the end report. The component responsible for this is 'ProductDocument.jsx'





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

#### StockSearchWidget:
- Displays a list of stock items (trees, logs, planks).
- Opens `ItemDialog` when an item is clicked.

#### ItemDialog:
- Displays a dialog with `ItemForm` for viewing, editing, or adding items.
- Passes the item details and type to `ItemForm`.

#### ItemForm:
- Renders the appropriate form (`LogForm`, `TreeForm`, `PlankForm`) based on the item type.
- Passes the item details and other props to the specific form component.

#### LogForm:
- The form component for editing or adding log details.
- Receives props from `ItemForm`.


