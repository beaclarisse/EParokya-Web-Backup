import React from 'react';
import { Link } from 'react-router-dom';

const GuestSideBar = () => {
  return (
    <div style={styles.sidebarContainer}>
      <h1 style={styles.title}>Eparokya</h1>
      <ul style={styles.menuList}>
        <li style={styles.menuItem}>
          <Link to="/events" style={styles.link}>Events</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/sermons" style={styles.link}>Sermons</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/prayers" style={styles.link}>Prayers</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebarContainer: {
    backgroundColor: '#26562e', 
    padding: '20px',
    width: '200px',
    height: '100vh',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    backgroundColor:' #c7ddb5',
    marginBottom: '15px',
  },
  link: {
    color: 'black', 
    fontSize: '18px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
};

export default GuestSideBar;
