import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignUpComponent from "./components/userAuth/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./components/userAuth/LogoutButton";
import SignInComponent from "./components/userAuth/SignIn";
import AddSawmillForm from "./components/sawmill/AddSawmillForm";
import UserProfileForm from "./components/users/UserProfileForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UserProfilesList from "./components/users/UserProfilesList";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase-config";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageContentContainer from "./components/customContainers/PageContentContainer";
import AboutPage from "./pages/AboutPage";
import { Login } from "./components/userAuth/LoginLogOut";
import UserHomePage from "./pages/UserHomePage";
import LoggedOutPage from "./pages/LoggedOutPage";
import UserProfilePage from "./pages/UserProfilePage";
import AddTreeForm from "./components/components-for-dev/trees/AddTreeForm";
import LocationsPage from "./pages/sub-pages/LocationsPage";
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

function App() {
 

  return (
  
    <div className="App">
        <Router>
        <Navigation />
        <PageContentContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/loggedoutpage" element={<LoggedOutPage />} />
        <Route path="/profile" element={<UserProfilePage />} />

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
        <Route path="/monitorplank/:plankId" element={<AddMoistureCheck />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/species" element={<SpeciesPage />} />

      </Routes>
      </PageContentContainer>
    </Router>
    
  




   
    </div>
  );
}

export default App;
