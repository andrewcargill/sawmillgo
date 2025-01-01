# SawmillGo - Technical Documentation

## 1. Project Overview
**SawmillGo** is a forestry and sawmill management application designed to provide traceability, transparency, and enhanced value to wood products by tracking stock through the sawmill process. The app integrates cloud-based storage, Firestore, and Google Maps to allow users to manage and report on wood from tree to final product. QR codes link products to publicly viewable reports.

---

## 2. Technology Stack
- **Frontend:** React (Typescript/Javascript)
- **Backend:** Firebase (Firestore, Cloud Functions)
- **Authentication:** Firebase Authentication (Future Development)
- **Database:** Firestore (NoSQL)
- **Storage:** Google Cloud Storage
- **Hosting:** Firebase Hosting
- **Mapping:** Google Maps API
- **QR Codes:** `qrcode.react` library (React)
- **Version Control:** Git (GitHub)
- **Deployment:** Google Cloud Functions + Firebase CLI

---

## 3. Folder Structure
```
root/
│
├── src/                     # Source Code
│   ├── components/          # React Components
│   │   ├── ProductDocumentation.js
│   │   ├── QRGenerator.js
│   │   └── ReportViewer.js
│   │   ├── about-page/ 
│   │       └── AboutSystem.jsx
│   │       └── ResponsiveCard.jsx (old)
│   │   ├── components-for-dev/ 
│   │       ├── dashboard/ 
│   │       ├── locations/ 
│   │       ├── projects/ 
│   │       ├── species/ 
│   │       ├── trees/ 
│   │   ├── country-components/ 
│   │       └── CountryNameFromCode.jsx
│   │       └── CountrySelect.jsx 
│   │       └── FlagIcon.jsx 
│   │   ├── creators/ 
│   │       ├── creator-product-managemet/ 
│   │           └── PostCreator.jsx
│   │           └── PostEdit.jsx
│   │           └── PostsList.jsx
│   │           └── ProductDetailsAddEdit.jsx
│   │           └── ProductForm.jsx
│   │       └── CreatorProfile.jsx
│   │       └── CreatorProjectList.jsx
│   │       └── projectDetailDialogue.jsx
│   │       └── UpdateCreatorProfile.jsx
│   │   ├── customContainers/ 
│   │       └── CustomeBox.jsx
│   │       └── CustomBoxDialog.jsx 
│   │       └── CustomBoxSimple.jsx 
│   │       └── PageContentContainer.jsx 
│   │   ├── customForms/ 
│   │       └── CustomFormHeading.jsx
│   │       └── CustomInput.jsx 
│   │       └── CustomViewItem.jsx 
│   │       └── CustomViewLongText.jsx 
│   │       └── FormBoxMain.jsx 
│   │   ├── google-maps/ 
│   │       └── AllSawmillsMaps.jsx
│   │       └── GoogleMapsReport.jsx 
│   │       └── GoogleMapsTour.jsx 
│   │       └── MapWithPin.jsx 
│   │       └── ReadOnlyMapWithPin.jsx 
│   │       └── StockMapComponent.jsx 
│   │       └── TreeMapComponent.jsx 
│   │   ├── image-components/ 
│   │       └── ImageGalleryComponent.jsx
│   │       └── SawmillImageGallery.jsx 
│   │   ├── item-dialogs/ 
│   │       ├── form-templates/ 
│   │           └── LogForm.jsx
│   │           └── PlankForm.jsx
│   │           └── TreeForm.jsx
│   │       └── ItemDialog.jsx 
│   │       └── ItemForm.jsx 
│   │   ├── locations-components/ 
│   │       └── AddLocationForm.jsx
│   │       └── AreaMap.jsx 
│   │       └── EditLocationForm.jsx 
│   │       └── LocationsHomePage.jsx 
│   │       └── LocationsTable.jsx 
│   │       └── MapComponent.jsx 
│   │       └── WidgetMap.jsx 
│   │   ├── mositure-checks/ 
│   │       └── AddMoistureCheck.jsx
│   │       └── PlankMoistureCheckGraph.jsx 
│   │   ├── pagination/ 
│   │       └── CustomPaginationActions.jsx│   │      
│   ├── pages/               # Page-Level Components
│   │   ├── HomePage.js
│   │   └── ReportPage.js
│   ├── firebase/            # Firebase Configuration
│   │   ├── firebaseConfig.js
│   │   └── firestoreRules.js
│   ├── utils/               # Utility Functions
│   │   └── mapUtils.js
│   └── App.js               # Main Application
│
├── public/                  # Static Files
├── functions/               # Google Cloud Functions
│   ├── index.js
│   └── qrCodeGenerator.js
│
└── README.md                # Project Setup & Overview
```

---

## 4. Key Components and Modules

### 4.1 ProductDocumentation (Component)
- **Purpose:** Fetches project data from Firestore and compiles detailed reports on trees, planks, and creator logs. Integrates with Google Maps to show tree locations.
- **Dependencies:** Firestore, Google Maps API
- **Inputs:** `projectId`
- **Output:** Rendered report with interactive data, images, and QR code

### 4.2 QR Code Generator (Component)
- **Purpose:** Generates QR codes linked to `/productreport/{projectId}` URLs.
- **Dependencies:** `qrcode.react`
- **Inputs:** `sawmillId`, `projectId`
- **Output:** Downloadable QR code

### 4.3 Report Viewer (Page)
- **Purpose:** Public-facing report page that fetches report data for display without login.
- **URL Structure:** `/productreport/{projectId}`
- **Security:** Read-only public access for reports

---

## 5. Cloud Functions

### 5.1 QR Code Generation
- **File:** `functions/qrCodeGenerator.js`
- **Trigger:** HTTPS callable endpoint
- **Purpose:** Generates QR codes dynamically for new projects
- **Return:** Base64 encoded QR image

### 5.2 Data Sync
- **File:** `functions/index.js`
- **Trigger:** Firestore Triggers (onCreate, onUpdate)
- **Purpose:** Ensures that any updates to stock or logs are reflected in linked public reports.

---

## 6. Database Schema (Firestore)
```
firestore-root/
│
├── sawmills/
│   ├── {sawmillId}/
│   │   ├── logs/
│   │   ├── projects/
│   │   │   └── {projectId}/
│   │   │       ├── trees/
│   │   │       ├── planks/
│   │   │       └── reports/
│
└── public_reports/
    ├── {reportId}/
    │   ├── reportData
    │   └── qrCode
```

---

## 7. Deployment
### Local Setup
1. Clone the repository:
```
git clone https://github.com/username/sawmillgo.git
```
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm start
```

### Firebase Deployment
1. Deploy Cloud Functions:
```
firebase deploy --only functions
```
2. Deploy Frontend:
```
firebase deploy
```

---

## 8. Security and Access Control
- **Current Status:** Public read access for reports, restricted write access.
- **Future Development:**
  - User roles (admin, sawmill owner, viewer)
  - Fine-grained Firestore rules to prevent data modification by unauthorized users.

---

## 9. Development Roadmap
- **Q1 2024:**
  - Implement user authentication and access levels
  - Style public-facing report pages
- **Q2 2024:**
  - Develop account management features
  - Expand cloud functions to ensure data consistency
- **Q3 2024:**
  - Testing and pilot program
  - Seek early-stage investment

---

## 10. Known Issues
- Some report modules need additional testing.
- Firestore rules need refining for better data protection.

---

## 11. Contributing
- For code contributions or bug reports, submit a pull request or open an issue on GitHub.

---

## 12. Contact
- **Developer:** [Your Name]  
- **Email:** [Your Email]  
- **GitHub:** [GitHub Profile Link]  

