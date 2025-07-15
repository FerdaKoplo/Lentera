import { useState } from 'react';
import SideBarPrincipal from './components/principal/sidebar-principal';
import CreateArticle from './pages/principal/articles/create-article';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrincipalMain from './pages/principal/PrincipalMain';
import ListAllArticle from './pages/principal/articles/list-all-article';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/articles" element={<ListAllArticle />} />
        <Route path="/principal/*" element={<PrincipalMain />} />
      </Routes>
    </Router>
  );
}


export default App;
