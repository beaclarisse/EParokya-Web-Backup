import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

const SideBar = () => {
  return (
    <Card className="sidebar-card" style={styles.sidebarCard}>
      <Card.Body>
        <Card.Title className="text-center" style={styles.title}>Admin Panel</Card.Title>
        <Nav className="flex-column">
          <Nav.Item>
            <Link to="/admin/users" className="sidebar-link" style={styles.sidebarLink}>
              Users
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/calendar" className="sidebar-link" style={styles.sidebarLink}>
              Calendar
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/postlist" className="sidebar-link" style={styles.sidebarLink}>
              Post List
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/eventpostlist" className="sidebar-link" style={styles.sidebarLink}>
              Event Post List
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/adminDate" className="sidebar-link" style={styles.sidebarLink}>
              Set Available Date
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/weddingList" className="sidebar-link" style={styles.sidebarLink}>
              Wedding List
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/baptismList" className="sidebar-link" style={styles.sidebarLink}>
              Baptism List
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/admin/funeralList" className="sidebar-link" style={styles.sidebarLink}>
              Funeral List
            </Link>
          </Nav.Item>
        </Nav>
      </Card.Body>
    </Card>
  );
};

const styles = {
  sidebarCard: {
    marginTop: "60px",
    width: "250px",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontWeight: "bold",
    marginBottom: "20px",
    fontSize: "1.2rem"
  },
  sidebarLink: {
    display: "block",
    padding: "10px 15px",
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  }
};

export default SideBar;
