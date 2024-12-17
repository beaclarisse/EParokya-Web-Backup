import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";

const BaptismList = () => {
  const [baptismForms, setBaptismForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchBaptismForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/list`);
      setBaptismForms(response.data.baptismForms);
      setFilteredForms(response.data.baptismForms);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching baptism forms.");
    } finally {
      setLoading(false);
    }
  };

  const filterForms = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilteredForms(baptismForms);
    } else {
      setFilteredForms(
        baptismForms.filter((form) => form.binyagStatus === status)
      );
    }
  };

  useEffect(() => {
    fetchBaptismForms();
  }, []);

  if (error) {
    alert(`Error: ${error}`);
    setError(null);
  }

  return (
    <div className="baptism-container">
      <h1 className="baptism-title">Baptism Forms</h1>

      {/* Filter Buttons */}
      <div className="baptism-filters">
        {["All", "Pending", "Confirmed", "Declined"].map((status) => (
          <button
            key={status}
            className={`baptism-filter-button ${
              activeFilter === status ? "active" : ""
            }`}
            onClick={() => filterForms(status)}
          >
            {status}
          </button>
        ))}
      </div>

     {loading ? (
        <p className="loading-text">Loading baptism forms...</p>
      ) : filteredForms.length === 0 ? (
        <p className="empty-text">No baptism forms available.</p>
      ) : (
        <div className="baptism-list">
          {filteredForms.map((item, index) => (
            <div
              key={item._id}
              className={`baptism-card ${
                item.binyagStatus.toLowerCase()
              }`}
            >
              <div className="status-badge">{item.binyagStatus}</div>
              <h3 className="card-title">Form #{index + 1}</h3>
              <div className="card-details">
                <p>
                  <strong>Child Name:</strong> {item.child.fullName}
                </p>
                <p>
                  <strong>Father's Name:</strong> {item.parents.fatherFullName}
                </p>
                <p>
                  <strong>Mother's Name:</strong> {item.parents.motherFullName}
                </p>
                <p>
                  <strong>Address:</strong> {item.parents.address}
                </p>
                <p>
                  <strong>Contact Info:</strong> {item.parents.contactInfo}
                </p>
                <p>
                  <strong>Baptism Date:</strong>{" "}
                  {new Date(item.baptismDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaptismList;
