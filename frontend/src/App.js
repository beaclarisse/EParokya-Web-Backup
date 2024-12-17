import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';

import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Login } from './Components/User/Login'
import Register from './Components/User/Register'
import Profile from './Components/User/Profile';

import ProtectedRoute from './Components/Route/protectedRoute';

//Dashboard
import Dashboard from './Components/Admin/Dashboard';
//User
import UsersList from './Components/Admin/User/UserList';
import UpdateUser from './Components/Admin/User/UserUpdate';

//Calendar
import Calendar from './Components/Admin/Calendar/Calendar';

//Post
import CreatePost from './Components/Admin/Post/Post';
import PostLists from './Components/Admin/Post/PostLists';
import PostUpdate from './Components/Admin/Post/PostUpdate';

import EventPost from './Components/Admin/EventPost/EventPostCreate';
import EventPostLists from './Components/Admin/EventPost/EventPostList';
import EventPostUpdate from './Components/Admin/EventPost/UpdateEventPost';

import WeddingList from './Components/Admin/Wedding/WeddingList';
import BaptismList from './Components/Admin/Baptism/BaptismList';
import FuneralList from './Components/Admin/Funeral/FuneralList';


//Guest View
import { Prayers } from './Components/Guest/Prayers';
import { Events } from './Components/Guest/Events';
import { Sermons } from './Components/Guest/Sermons';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/profile" element={<Profile />} exact="true" />

        {/* Admin 
        need mo itago yung dashboard from the user*/}
        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}> <Dashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />

        {/* calendar */}
        <Route path="/admin/calendar" element={<ProtectedRoute isAdmin={true}><Calendar /></ProtectedRoute>} />

        {/* Post */}
        <Route path="/admin/post/create" element={<ProtectedRoute isAdmin={true}><CreatePost /></ProtectedRoute>} />
        <Route path="/admin/postlist" element={<ProtectedRoute isAdmin={true}><PostLists /></ProtectedRoute>} />
        <Route path="/admin/post/:id" element={<ProtectedRoute isAdmin={true}><PostUpdate /></ProtectedRoute>} />
     
        {/* Event Post */}
        <Route path="/admin/eventpost/create" element={<ProtectedRoute isAdmin={true}><EventPost /></ProtectedRoute>} />
        <Route path="/admin/eventpostlist" element={<ProtectedRoute isAdmin={true}><EventPostLists /></ProtectedRoute>} />
        <Route path="/admin/editevent/:id" element={<ProtectedRoute isAdmin={true}><EventPostUpdate /></ProtectedRoute>} />


        <Route path="/admin/weddingList" element={<ProtectedRoute isAdmin={true}><WeddingList /></ProtectedRoute>} />
        <Route path="/admin/baptismList" element={<ProtectedRoute isAdmin={true}><BaptismList /></ProtectedRoute>} />
        <Route path="/admin/funeralList" element={<ProtectedRoute isAdmin={true}><FuneralList /></ProtectedRoute>} />


        {/* Guest View */}
        <Route path="/prayers" element={<Prayers />} exact="true" />
        <Route path="/sermons" element={<Sermons />} exact="true" />
        <Route path="/Events" element={<Events />} exact="true" />

      </Routes>
    </Router>
  );
}

export default App;