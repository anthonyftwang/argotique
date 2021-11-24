import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Nav } from './components/Nav.js';
import { HomePage } from './pages/HomePage.js';
import { PostPage } from './pages/PostPage.js';
import { UserPage } from './pages/UserPage.js';
import { BasePage } from './pages/BasePage.js';
import './App.css';

function App() {
  return (
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
        </main>
      </div>
    </Router>
  )
}

export default withAuthenticator(App);
