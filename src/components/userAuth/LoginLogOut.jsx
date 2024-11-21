import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button, CircularProgress, Grid } from "@mui/material";
import CustomFormHeading from "../customForms/CustomFormHeading";
import FormBoxMain from "../customForms/FormBoxMain";
import CustomInput from "../customForms/CustomInput";
import UserContext from "../../Contexts/UserContext";
import { set } from "firebase/database";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config";

const db = getFirestore(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { setUserProfileInfo } = useContext(UserContext);

  const navigate = useNavigate(); // Use navigate to redirect after successful login
  const auth = getAuth();

  const fetchSawmillName = async (sawmillId) => {
    const docRef = doc(db, "sawmill", sawmillId); // Make sure this path is correct
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().name; // Return the sawmill's name
    } else {
      return "Unknown Sawmill"; // Fallback value
    }
  };

  const fetchUserProfile = async (userId) => {
    const userProfileRef = doc(db, "users", userId);
    const userProfileSnap = await getDoc(userProfileRef);

    if (userProfileSnap.exists()) {
      const userProfileData = userProfileSnap.data();
      // If sawmillId exists, fetch the sawmill name
      if (userProfileData.sawmillId) {
        const sawmillName = await fetchSawmillName(userProfileData.sawmillId);
        userProfileData.sawmillName = sawmillName; // Add the sawmill name to the user profile object
      }

      return userProfileData;
    } else {
      console.log("No user profile found!");
      return null;
    }
  };

  const submit = async (e) => {
    // Mark submit as async
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const creationTime = user.metadata.creationTime; // Extract creation time from user metadata

      let userProfile = await fetchUserProfile(user.uid);
      if (!userProfile) {
        console.log("No user profile found!");
        userProfile = {}; // Fallback to an empty object if no profile is found
      }
      userProfile = {
        ...userProfile,
        id: user.uid,
        email: user.email,
        creationTime: creationTime,
        // Any other user details you wish to include...
      };
      if (userProfile.sawmillId) {
        const sawmillName = await fetchSawmillName(userProfile.sawmillId);
        userProfile.sawmillName = sawmillName;
      }

      setUserProfileInfo(userProfile); // Enriched with sawmill name
      const dataToStore = {
        sawmillName: userProfile.sawmillName,
        imageUrl: userProfile.imageUrl,
        username: userProfile.id,
        displayName: userProfile.username,
        sawmillId: userProfile.sawmillId,
        role: userProfile.role,
        country: userProfile.country,
      };
      localStorage.setItem("user", JSON.stringify(dataToStore));
      setLoading(false);

      navigate("/home"); // Navigate after the userProfile is set
    } catch (error) {
      setLoading(false);
      setLoginError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Grid container flexDirection={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={4} lg={3} pt={6}>
          <CustomFormHeading title="Log In" />
          <FormBoxMain>
            <form onSubmit={submit}>
              <Grid item xs={12}>
                <CustomInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
                {loginError && <div style={{ color: "red" }}>{loginError}</div>}
              </Grid>
            </form>
          </FormBoxMain>
        </Grid>
      </Grid>
    </>
  );
};

const CreatorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { setUserProfileInfo } = useContext(UserContext);

  const navigate = useNavigate(); // Use navigate to redirect after successful login
  const auth = getAuth();

  const fetchSawmillName = async (sawmillId) => {
    const docRef = doc(db, "sawmill", sawmillId); // Make sure this path is correct
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().name; // Return the sawmill's name
    } else {
      return "Unknown Sawmill"; // Fallback value
    }
  };

  const fetchUserProfile = async (userId) => {
    const userProfileRef = doc(db, "users", userId);
    const userProfileSnap = await getDoc(userProfileRef);

    if (userProfileSnap.exists()) {
      const userProfileData = userProfileSnap.data();
      // If sawmillId exists, fetch the sawmill name
      if (userProfileData.sawmillId) {
        const sawmillName = await fetchSawmillName(userProfileData.sawmillId);
        userProfileData.sawmillName = sawmillName; // Add the sawmill name to the user profile object
      }

      return userProfileData;
    } else {
      console.log("No user profile found!");
      return null;
    }
  };

  const submit = async (e) => {
    // Mark submit as async
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const creationTime = user.metadata.creationTime; // Extract creation time from user metadata

      let userProfile = await fetchUserProfile(user.uid);
      if (!userProfile) {
        console.log("No user profile found!");
        userProfile = {}; // Fallback to an empty object if no profile is found
      }
      userProfile = {
        ...userProfile,
        id: user.uid,
        email: user.email,
        creationTime: creationTime,
        // Any other user details you wish to include...
      };
      if (userProfile.sawmillId) {
        const sawmillName = await fetchSawmillName(userProfile.sawmillId);
        userProfile.sawmillName = sawmillName;
      }

      setUserProfileInfo(userProfile); // Enriched with sawmill name
      const dataToStore = {
        sawmillName: userProfile.sawmillName,
        imageUrl: userProfile.imageUrl,
        username: userProfile.id,
        displayName: userProfile.username,
        sawmillId: userProfile.sawmillId,
        role: userProfile.role,
        country: userProfile.country,
      };
      localStorage.setItem("user", JSON.stringify(dataToStore));
      setLoading(false);

      navigate("/creatorhome"); // Navigate after the userProfile is set
    } catch (error) {
      setLoading(false);
      setLoginError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <Grid container flexDirection={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={7} md={5} lg={4} pt={6}>
          <CustomFormHeading title="Creator Log In" />
          <FormBoxMain>
            <form onSubmit={submit}>
              <Grid item xs={12}>
                <CustomInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
                {loginError && <div style={{ color: "red" }}>{loginError}</div>}
              </Grid>
            </form>
          </FormBoxMain>
        </Grid>
      </Grid>
  );
};

const Logout = () => {
  // Redirect handeled in Navigation.jsx //

  // const navigate = useNavigate(); // Use navigate for redirection after logout
  // const auth = getAuth();

  // useEffect(() => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     navigate('/loggedoutpage'); // Redirect to logout success or login page
  //   }).catch((error) => {
  //     // An error happened.
  //     console.error('Logout error:', error);
  //   });
  // }, [auth, navigate]);

  return <div></div>;
};

export { Login, Logout, CreatorLogin };
