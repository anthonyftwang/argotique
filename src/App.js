import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { useTheme, useMediaQuery } from '@mui/material';
import Nav from 'components/Nav';
import DrawerMenu from 'components/DrawerMenu';
import BasePage from 'views/BasePage';
import PostPage from 'views/PostPage';
import HomePage from 'views/HomePage';
import UserPage from 'views/UserPage';
import LikedPage from 'views/LikedPage';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App() {
  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Authenticator>
      {({ user }) => (
        <Router basename="/">
          <div>
            <Nav username={user.username} />
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
              {wideScreen && <DrawerMenu username={user.username} />}
            </main>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
