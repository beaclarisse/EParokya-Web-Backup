import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";
import SideBar from "../SideBar";

const FuneralList = () => {
    const [funeralList, setFuneralList] = useState([]); 
    const [filteredFuneralList, setFilteredFuneralList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    const fetchFunerals = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/getAllFunerals`,
                { withCredentials: true }
            );

            if (response.data && Array.isArray(response.data)) {
                setFuneralList(response.data); 
                setFilteredFuneralList(response.data); 
            } else {
                setFuneralList([]);
                setFilteredFuneralList([]);
            }
        } catch (err) {
            console.error("Error fetching funeral records:", err);
            setError("Unable to fetch funeral records. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filterFunerals = (status) => {
        setActiveFilter(status);
        if (status === "All") {
            setFilteredFuneralList(funeralList);
        } else {
            const filtered = funeralList.filter(
                (funeral) => funeral.funeralStatus === status
            );
            setFilteredFuneralList(filtered);
        }
    };
    useEffect(() => {
        fetchFunerals();
    }, []);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <SideBar />
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <h1 className="funeral-title">Funeral Records</h1>
                <div className="funeral-filters">
                    {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
                        <button
                            key={status}
                            className={`funeral-filter-button ${activeFilter === status ? "active" : ""}`}
                            onClick={() => filterFunerals(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="loading-text">Loading funeral records...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : filteredFuneralList.length === 0 ? (
                    <p className="empty-text">No funeral records available.</p>
                ) : (
                    <div className="funeral-list">
                        {filteredFuneralList.map((item, index) => (
                            <div
                                key={item._id || index} 
                                className={`funeral-card ${item.funeralStatus?.toLowerCase() || ""}`}
                            >
                                <div className="status-badge">{item.funeralStatus || "Unknown"}</div>
                                <h3 className="card-title">Record #{index + 1}</h3>
                                <div className="card-details">
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {`${item?.name?.firstName || ""} ${item?.name?.middleName || ""} ${item?.name?.lastName || ""} ${item?.name?.suffix || ""}`}
                                    </p>
                                    <p>
                                        <strong>Gender:</strong> {item.gender || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Age:</strong> {item.age || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Funeral Date:</strong>{" "}
                                        {item.funeralDate
                                            ? new Date(item.funeralDate).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <strong>Service Type:</strong> {item.serviceType || "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FuneralList;
