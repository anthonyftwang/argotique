import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useTheme, useMediaQuery } from '@mui/material';
import Nav from 'components/Nav/Nav';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';
import BasePage from 'views/BasePage/BasePage';
import PostPage from 'views/PostPage/PostPage';
import HomePage from 'views/HomePage/HomePage';
import UserPage from 'views/UserPage/UserPage';
import LikedPage from 'views/LikedPage/LikedPage';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <Router basename="/">
      <div>
        <Nav />
        <main>
          <Routes>
            <Route
              path="/post/:id"
              element={
                <BasePage childView={<PostPage />} key={Math.random()} />
              }
            />
            <Route
              path="/user/:id"
              element={
                <BasePage childView={<UserPage />} key={Math.random()} />
              }
            />
            <Route
              path="/liked"
              element={
                <BasePage childView={<LikedPage />} key={Math.random()} />
              }
            />
            <Route
              path="/"
              element={
                <BasePage childView={<HomePage />} key={Math.random()} />
              }
            />
            <Route
              path="*"
              element={<Navigate replace to="/" key={Math.random()} />}
            />
          </Routes>
          {wideScreen && <DrawerMenu />}
        </main>
      </div>
    </Router>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' },
        ]}
      />
    </AmplifyAuthenticator>
  );
}

export default App;
