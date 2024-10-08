import { useEffect, useState } from "react";
import "./App.css";
import SignUpComponent from "./components/userAuth/SignUp";
import AddSawmillForm from "./components/sawmill/AddSawmillForm";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageContentContainer from "./components/customContainers/PageContentContainer";
import AboutPage from "./pages/AboutPage";
import { CreatorLogin, Login } from "./components/userAuth/LoginLogOut";
import UserHomePage from "./pages/UserHomePage";
import LoggedOutPage from "./pages/LoggedOutPage";
import UserProfilePage from "./pages/UserProfilePage";
import AddTreeForm from "./components/components-for-dev/trees/AddTreeForm";
import ProjectsPage from "./pages/sub-pages/ProjectsPage";
import TreesPage from "./pages/sub-pages/TreesPage";
import SpeciesPage from "./pages/sub-pages/SpeciesPage";
import LogsPage from "./pages/sub-pages/LogsPage";
import LogDetails from "./pages/sub-pages/logs-pages/LogDetails";
import AddLog from "./components/treeLogs/AddLog";
import EditLog from "./components/treeLogs/EditLog";
import PlanksPage from "./pages/sub-pages/PlanksPage";
import PlankDetails from "./pages/sub-pages/planks-pages/PlankDetails";
import EditPlank from "./components/planks/EditPlank";
import AddPlank from "./components/planks/AddPlank";
import AddMoistureCheck from "./components/mositure-checks.jsx/AddMoistureCheck";
import ReportMockUp from "./pages/ReportMockUp";
import CreatorProfile from "./components/creators/CreatorProfile";
import CreatorHomePage from "./pages/CreatorHomePage";
import ProductForm from "./components/creators/creator-product-management/ProductForm";
import ProjectReportGenerator from "./components/project-report/ProjectReportGenerator";
import ProductDocumentation from "./pages/ProductDocumentation";
import SawmillDetails from "./components/sawmill/SawmillDetails";
import EditSawmillForm from "./components/sawmill/EditSawmillForm";
import AllSawmill from "./pages/AllSawmill";
import LocationsHomePage from "./components/locations-components/LocationsHomePage";
import EditLocationForm from "./components/locations-components/EditLocationForm";
import AddLocationForm from "./components/locations-components/AddLocationForm";
import Dashboard from "./components/components-for-dev/projects/DashboardWireFrame";
import ItemManager from "./components/components-for-dev/dashboard/ItemManager";

function App() {
  const [isReportMockUpLoaded, setIsReportMockUpLoaded] = useState(false);

  useEffect(() => {
    console.log("isReportMockUpLoaded: ", isReportMockUpLoaded);
  }, [isReportMockUpLoaded]);

  return (
    <div className="App">
      <Router>
        {/* <Navigation /> */}
        {!isReportMockUpLoaded && <Navigation />}
        <PageContentContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sawmills" element={<AllSawmill />} />
            <Route
              path="/productreport/:projectId"
              element={<ProductDocumentation />}
            />

            <Route
              path="/authreport/:reportId"
              element={
                <ReportMockUp
                  onLoad={() => setIsReportMockUpLoaded(true)}
                  onUnload={() => setIsReportMockUpLoaded(false)}
                />
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/creatorlogin" element={<CreatorLogin />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/home" element={<UserHomePage />} />
            <Route path="/creatorhome" element={<CreatorHomePage />} />

            <Route path="/loggedoutpage" element={<LoggedOutPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route
              path="/creatorprofile/:creatorId"
              element={<CreatorProfile />}
            />
            <Route path="/product/:projectId" element={<ProductForm />} />
            <Route path="/addsawmill" element={<AddSawmillForm />} />
            <Route path="/edit-sawmill" element={<EditSawmillForm />} />
            <Route path="/sawmill-details" element={<SawmillDetails />} />
            <Route path="/addtree" element={<AddTreeForm />} />
            <Route path="/trees" element={<TreesPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/log/:logId" element={<LogDetails />} />
            <Route path="/editlog/:logId" element={<EditLog />} />
            <Route path="/addlog" element={<AddLog />} />
            <Route path="/planks" element={<PlanksPage />} />
            <Route path="/plank/:plankId" element={<PlankDetails />} />
            <Route path="/editplank/:plankId" element={<EditPlank />} />
            <Route path="/addplank" element={<AddPlank />} />
            <Route
              path="/monitorplank/:plankId"
              element={<AddMoistureCheck />}
            />
            <Route path="/locations" element={<LocationsHomePage />} />
            <Route
              path="/edit-location/:locationId"
              element={<EditLocationForm />}
            />
            <Route path="/add-location" element={<AddLocationForm />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/report/:projectId"
              element={<ProjectReportGenerator />}
            />
            <Route path="/species" element={<SpeciesPage />} />
            <Route path="/wireframe" element={<Dashboard />} />
            <Route path="/wireframe-home" element={<ItemManager />} />
          </Routes>
        </PageContentContainer>
      </Router>
    </div>
  );
}

export default App;
