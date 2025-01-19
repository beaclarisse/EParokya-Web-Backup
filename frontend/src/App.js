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
import UserCalendar from './Components/User/UserCalendar';
import NavigationForms from './Components/User/NavigationForms';

import BaptismForm from './Components/User/Forms/PrivateForms/Baptism/BaptismForm';
import FuneralForm from './Components/User/Forms/PrivateForms/Funeral/FuneralForm';


import ProtectedRoute from './Components/Route/protectedRoute';

//Dashboard
import Dashboard from './Components/Admin/Dashboard';
//User
import UsersList from './Components/Admin/User/UserList';
import UpdateUser from './Components/Admin/User/UserUpdate';

//Calendar
import Calendar from './Components/Admin/Calendar/Calendar';
import AdminDate from './Components/Admin/AdminDate';
import AddEvent from './Components/Admin/Calendar/AddEvent';


//Post
import CreatePost from './Components/Admin/Post/Post';
import PostLists from './Components/Admin/Post/PostLists';
import PostUpdate from './Components/Admin/Post/PostUpdate';

import EventPost from './Components/Admin/EventPost/EventPostCreate';
import EventPostLists from './Components/Admin/EventPost/EventPostList';
import EventPostUpdate from './Components/Admin/EventPost/UpdateEventPost';

import AnnouncementCategory from './Components/Admin/Announcement/CreateAnnouncementCategory';
import Announcement from './Components/Admin/Announcement/CreateAnnouncement';
import AnnouncementList from './Components/Admin/Announcement/AnnouncementList';


import WeddingList from './Components/Admin/Wedding/WeddingList';
import WeddingDetails from './Components/Admin/Wedding/WeddingDetails';

import BaptismList from './Components/Admin/Baptism/BaptismList';
import BaptismDetails from './Components/Admin/Baptism/BapstismDetails';

import FuneralList from './Components/Admin/Funeral/FuneralList';
import FuneralDetails from './Components/Admin/Funeral/FuneralDetails';

//Admin

import MinistryCategory from './Components/Admin/Ministries/CreateMinistryCategory';



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
        <Route path="/user/calendar" element={<UserCalendar />} exact="true" />
        <Route path="/user/NavigationForms" element={<NavigationForms />} exact="true" />

        <Route path="/user/baptismForm" element={<BaptismForm />} exact="true" />
        <Route path="/user/funeralForm" element={<FuneralForm />} exact="true" />


        {/* Admin 
        need mo itago yung dashboard from the user*/}
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}> <Dashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />

        {/* calendar */}
        <Route path="/admin/calendar" element={<ProtectedRoute isAdmin={true}><Calendar /></ProtectedRoute>} />
        {/* ministry */}
        <Route path="/admin/ministryCategory/create" element={<ProtectedRoute isAdmin={true}><MinistryCategory /></ProtectedRoute>} />


        {/* announcement - update */}
        <Route path="/admin/announcementCategory/create" element={<ProtectedRoute isAdmin={true}><AnnouncementCategory /></ProtectedRoute>} />
        <Route path="/admin/create/announcement" element={<ProtectedRoute isAdmin={true}><Announcement /></ProtectedRoute>} />
        <Route path="/admin/announcementList" element={<ProtectedRoute isAdmin={true}><AnnouncementList /></ProtectedRoute>} />

        {/* Post */}
        <Route path="/admin/post/create" element={<ProtectedRoute isAdmin={true}><CreatePost /></ProtectedRoute>} />
        <Route path="/admin/postlist" element={<ProtectedRoute isAdmin={true}><PostLists /></ProtectedRoute>} />
        <Route path="/admin/post/:id" element={<ProtectedRoute isAdmin={true}><PostUpdate /></ProtectedRoute>} />

        {/* Event Post */}
        <Route path="/admin/eventpost/create" element={<ProtectedRoute isAdmin={true}><EventPost /></ProtectedRoute>} />
        <Route path="/admin/eventpostlist" element={<ProtectedRoute isAdmin={true}><EventPostLists /></ProtectedRoute>} />
        <Route path="/admin/editevent/:id" element={<ProtectedRoute isAdmin={true}><EventPostUpdate /></ProtectedRoute>} />

        <Route path="/admin/adminDate" element={<ProtectedRoute isAdmin={true}><AdminDate /></ProtectedRoute>} />
        <Route path="/admin/addEvent" element={<ProtectedRoute isAdmin={true}><AddEvent /></ProtectedRoute>} />

        <Route path="/admin/weddingList" element={<ProtectedRoute isAdmin={true}><WeddingList /></ProtectedRoute>} />
        <Route path="/admin/baptismList" element={<ProtectedRoute isAdmin={true}><BaptismList /></ProtectedRoute>} />
        <Route path="/admin/funeralList" element={<ProtectedRoute isAdmin={true}><FuneralList /></ProtectedRoute>} />

        <Route path="/admin/weddingDetails/:weddingId" element={<ProtectedRoute isAdmin={true}><WeddingDetails /></ProtectedRoute>} />
        <Route path="/admin/baptismDetails/:baptismId" element={<ProtectedRoute isAdmin={true}><BaptismDetails /></ProtectedRoute>} />
        <Route path="/admin/funeralDetails/:funeralId" element={<ProtectedRoute isAdmin={true}><FuneralDetails /></ProtectedRoute>} />


        {/* Guest View */}
        <Route path="/prayers" element={<Prayers />} exact="true" />
        <Route path="/sermons" element={<Sermons />} exact="true" />
        <Route path="/Events" element={<Events />} exact="true" />

      </Routes>
    </Router>
  );
}

export default App;