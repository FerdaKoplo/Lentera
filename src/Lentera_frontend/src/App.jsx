import { useState } from 'react';
import SideBarPrincipal from './components/principal/sidebar-principal';
import CreateArticle from './pages/principal/articles/create-article';

function App() {
 
  return (
    <main className='pl-60'>
      <SideBarPrincipal />
      <CreateArticle />
    </main>
  );
}


export default App;
