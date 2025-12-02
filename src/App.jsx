import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomAppBar from './components/appBar';
import BookSearch from './views/BookSearch'
import MyBooks from './views/MyBooks';
import UserProfile from './views/UserProfile';
import MyLibrary from './views/MyLibrary';
import Loans from './views/Loans'
import './App.css'

function App() {

   return (

    <Router>
      <CustomAppBar />
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path='/MyBooks' element={<MyBooks />} />
        <Route path='/BookSearch' element={<BookSearch />} />
        <Route path='/Loans' element={<Loans />} />
        <Route path='/user' element={<UserProfile />} />
        <Route path='/MyLibrary' element={<MyLibrary />} />
      </Routes>
    </Router>
  );

}

export default App
