import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('jwtToken');

  if(!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
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
          <Route path='/MyBooks' element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
          <Route path='/BookSearch' element={<ProtectedRoute><BookSearch /></ProtectedRoute>} />
          <Route path='/Loans' element={<ProtectedRoute><Loans /></ProtectedRoute>} />
          <Route path='/user' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path='/MyLibrary' element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );

}

export default App
