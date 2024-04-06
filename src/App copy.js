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

function App() {
  const [username, setUsername] = useState(null); // State to hold user info
  // const [user, setUser] = useState(null); // State to hold user info

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, fetch their profile
        const docRef = doc(db, "users", currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username || "");
          } else {
            // Handle the case where the user document does not exist
            console.log("No user document found!");
          }
        });
      } else {
        // User is signed out
        setUsername(""); // Clear username or set to a default state
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);


  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser); // Set user or null
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  return (
  
    <div className="App">
        <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
    
      <Navigation />
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <h1>Sawmill Go</h1>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid container item xs={12}>
          {user ? (
            <>
              <Grid item xs={12}>
                <p>
                  Welcome, {username || "User"}! 
               
                </p>
              </Grid>
              <Grid item xs={4} bgcolor={'lightgray'}>
                <AddSawmillForm />
              </Grid>
              <Grid item xs={4} bgcolor={'lightblue'}>
                <UserProfileForm />
              </Grid>
              <Grid item xs={4} bgcolor={'lightblue'}>
                <UserProfilesList />
              </Grid>

            </>
          ) : (
            <p>Please sign in to see your profile information.</p>
          )}
        </Grid>
      </Grid>

     <Grid container spacing={1} bgcolor={'darkgrey'}>
        <Grid item xs={12}>
        {user ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <SignUpComponent />
            <SignInComponent />
          </>
        )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
