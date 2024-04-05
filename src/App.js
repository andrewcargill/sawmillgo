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

function App() {
  const [user, setUser] = useState(null); // State to hold user info

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user or null
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
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
                  Welcome, {user.displayName || "User"}! Your email is{" "}
                  {user.email}.
                </p>
              </Grid>
              <Grid item xs={6} bgcolor={'lightgray'}>
                <AddSawmillForm />
              </Grid>
              <Grid item xs={6} bgcolor={'lightblue'}>
                <UserProfileForm />
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
