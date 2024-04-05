import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpComponent from './components/userAuth/SignUp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './components/userAuth/LogoutButton';
import SignInComponent from './components/userAuth/SignIn';
import AddSawmillForm from './components/sawmill/AddSawmillForm';


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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Sawmill Go on Firebase
        </p>
        {user ? (
          <>
        <p>Welcome, {user.displayName || 'User'}! Your email is {user.email}.</p>
        <AddSawmillForm />
        </>
      ) : (
        <p>Please sign in to see your profile information.</p>
      )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
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
     
      </div>
    </div>
  );
}

export default App;
