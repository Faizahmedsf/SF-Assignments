import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateUser from './Components/Create User/CreateUser';
import NotFound from './Components/NotFound/NotFound';
import Edit from './Components/Edit/Edit';
// getUser

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
     
        <Route path='/' element={<Header />} />
        <Route path='/createuser' element={<CreateUser />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>  

      
      </BrowserRouter>
    </div>
  );

}

export default App;
