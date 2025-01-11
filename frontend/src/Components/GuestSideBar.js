import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPray, FaBook, FaCog, FaRegFileAlt } from 'react-icons/fa';

const GuestSideBar = () => {
  const [user, setUser] = useState({
    name: "Guest",
    avatar: "default-profile-icon.png", 
  });

  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/profile`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); 
          const userData = data.user;
          setUser({
            name: userData.name || "Guest",
            avatar: userData.avatar.url || "default-profile-icon.png",
          });
        } else {
          console.error("Failed to fetch user data, status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    console.log('Updated user state:', user);
  }, [user]);
  

  return (
    <div style={styles.sidebarContainer}>
      <div style={styles.profileContainer}>
        <img
          src={user.avatar}
          alt={`${user.name}'s profile`}
          style={styles.profilePicture}
        />
        <h2 style={styles.welcomeText}>Hello {user.name}!</h2>
      </div>

{/* menu */}
      <ul style={styles.menuList}>
        <li style={styles.menuItem}>
          <Link
            to="/"
            style={{
              ...styles.link,
              ...(location.pathname === "/" ? styles.activeLink : {}),
            }}
          >
            <FaHome style={styles.icon} /> Home
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/events"
            style={{
              ...styles.link,
              ...(location.pathname === "/events" ? styles.activeLink : {}),
            }}
          >
            <FaCalendarAlt style={styles.icon} /> Events
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/sermons"
            style={{
              ...styles.link,
              ...(location.pathname === "/sermons" ? styles.activeLink : {}),
            }}
          >
            <FaBook style={styles.icon} /> Sermon
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/prayers"
            style={{
              ...styles.link,
              ...(location.pathname === "/prayers" ? styles.activeLink : {}),
            }}
          >
            <FaPray style={styles.icon} /> Prayers
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/user/calendar"
            style={{
              ...styles.link,
              ...(location.pathname === "/user/calendar" ? styles.activeLink : {}),
            }}
          >
            <FaCalendarAlt style={styles.icon} /> Calendar
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link
            to="/resources"
            style={{
              ...styles.link,
              ...(location.pathname === "/resources" ? styles.activeLink : {}),
            }}
          >
            <FaRegFileAlt style={styles.icon} /> Resource Page
          </Link>
        </li>
      </ul>

      <ul style={styles.settingsList}>
        <li style={styles.menuItem}>
          <Link
            to="/settings"
            style={{
              ...styles.link,
              ...(location.pathname === "/settings" ? styles.activeLink : {}),
            }}
          >
            <FaCog style={styles.icon} /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebarContainer: {
    backgroundColor: '#d6e7c6',
    padding: '20px',
    width: '220px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profilePicture: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
    border: '2px solid #FFFFFF',
  },
  welcomeText: {
    color: '#26562e',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    marginBottom: '10px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    color: '#26562e',
    textDecoration: 'none',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  activeLink: {
    backgroundColor: '#93c47d',
    color: '#26562e',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  settingsList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 'auto',
  },
};

export default GuestSideBar;
