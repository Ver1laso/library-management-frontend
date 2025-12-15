import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import CustomAppBar from './components/appBar';
import BookSearch from './views/BookSearch'
import MyBooks from './views/MyBooks';
import UserProfile from './views/UserProfile';
import MyLibrary from './views/MyLibrary';
import Loans from './views/Loans'
import WelcomePage from './views/WelcomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import libraryServices from './services/libraryServices';
import './App.css'


function ProtectedViews() {

  useEffect(()=> {
    const loggedUserToken = localStorage.getItem('jwtToken');
    if(loggedUserToken){
      libraryServices.setToken(loggedUserToken);
    }
  }, []);

  return (
    <>
    <CustomAppBar />
    <Outlet />
    </>
  )
}

function PublicViews() {
  return <Outlet />
}




function App() {


   return (

    <Router>
      <Routes>
        <Route element={<PublicViews />} >
          <Route path="/" element={<WelcomePage />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/RegisterPage' element={<RegisterPage />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<ProtectedViews />} >
          <Route path='/MyBooks' element={<MyBooks />} />
          <Route path='/BookSearch' element={<BookSearch />} />
          <Route path='/Loans' element={<Loans />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/MyLibrary' element={<MyLibrary />} />
        </Route>
      </Routes>
    </Router>
  );

}

export default App
