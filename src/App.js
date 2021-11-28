import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Nav } from './components/Nav.js';
import { DrawerMenu } from './components/DrawerMenu.js';
import { HomePage } from './pages/HomePage.js';
import { PostPage } from './pages/PostPage.js';
import { UserPage } from './pages/UserPage.js';
import { BasePage } from './pages/BasePage.js';
import './App.css';

import Amplify from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <Router basename="/">
      <div>
        <Nav />
        <main>
          <Routes>
            <Route path="/post/:id" element={<BasePage child={<PostPage />} key={Math.random()} />} />
            <Route path="/user/:id" element={<BasePage child={<UserPage />} key={Math.random()} />} />
            <Route path="/" element={<BasePage child={<HomePage />} key={Math.random()} />} />
            <Route path="*" render={() => <Navigate to="/" />} />
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
          { type: "username" },
          { type: "password" },
          { type: "email" }
        ]}
      />
    </AmplifyAuthenticator>
  );
}