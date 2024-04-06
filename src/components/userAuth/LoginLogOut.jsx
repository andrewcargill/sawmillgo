import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button, CircularProgress, Grid } from '@mui/material';
import CustomFormHeading from '../customForms/CustomFormHeading';
import FormBoxMain from '../customForms/FormBoxMain';
import CustomInput from '../customForms/CustomInput';
import UserContext from '../../Contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useContext(UserContext);

  const navigate = useNavigate(); // Use navigate to redirect after successful login
  const auth = getAuth();


  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Store the user's ID and email in the context
        login({ id: user.uid, email: user.email });
        setLoading(false);
       
        navigate('/userhomepage');
      })
      .catch((error) => {
        setLoading(false);
        setLoginError('Login failed. Please check your credentials.');
        console.error('Login error:', error);
      });
  };

  return (
    <div>
      <Grid container pt={4}></Grid>
      <CustomFormHeading title="Log In" />
      <FormBoxMain>
        <form onSubmit={submit}>
          <Grid item xs={12}>
            <CustomInput
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
            {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
          </Grid>
        </form>
      </FormBoxMain>
    </div>
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
  
  export { Login, Logout };
