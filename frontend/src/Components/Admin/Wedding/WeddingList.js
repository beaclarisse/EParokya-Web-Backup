import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";
import SideBar from "../SideBar";

const WeddingList = ({ navigateToDetails }) => {
    const [weddingForms, setWeddingForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredStatus, setFilteredStatus] = useState("All");

    const fetchWeddingForms = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/getAllWeddings`, {
                withCredentials: true,
            });

            if (response.data && Array.isArray(response.data)) {
                setWeddingForms(response.data);
            } else {
                setWeddingForms([]);
            }
        } catch (error) {
            window.alert("Unable to fetch wedding forms.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeddingForms();
    }, []);

    const handleCardClick = (item) => {
        if (navigateToDetails) {
            navigateToDetails(item._id); // Pass wedding ID to navigate
        } else {
            console.log("Details page navigation is not set up.");
        }
    };

    const filterWeddingForms = (status) => {
        if (status === "All") {
            return weddingForms;
        }
        return weddingForms.filter((wedding) => wedding.weddingStatus === status);
    };

    const renderWeddingForm = (item) => {
        const { bride, groom, attendees, flowerGirl, ringBearer, weddingDate, weddingStatus } = item;

        const statusColor =
            weddingStatus === "Confirmed"
                ? "#28a745"
                : weddingStatus === "Declined"
                    ? "#dc3545"
                    : "#ffc107";

        return (
            <div
                key={item._id}
                className="card"
                style={{ borderLeft: `6px solid ${statusColor}` }}
                onClick={() => handleCardClick(item)}
            >
                <h3>{bride && groom ? `${bride} & ${groom}` : "Names not available"}</h3>
                <p>
                    <strong>Wedding Date:</strong>{" "}
                    {weddingDate ? new Date(weddingDate).toLocaleDateString() : "N/A"}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: statusColor }}>{weddingStatus || "N/A"}</span>
                </p>
                <p>
                    <strong>Attendees:</strong> {attendees ?? "N/A"}
                </p>
                <p>
                    <strong>Flower Girl:</strong> {flowerGirl || "N/A"} |{" "}
                    <strong>Ring Bearer:</strong> {ringBearer || "N/A"}
                </p>
            </div>
        );
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <SideBar />
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <h1>Submitted Wedding Forms</h1>

                <div className="filter-container" style={{ marginBottom: "20px" }}>
                    {["All", "Confirmed", "Pending", "Declined"].map((status) => (
                        <button
                            key={status}
                            className={`filter-button ${filteredStatus === status ? "active" : ""}`}
                            onClick={() => setFilteredStatus(status)}
                            style={{
                                marginRight: "10px",
                                padding: "10px 15px",
                                cursor: "pointer",
                                border: "1px solid #ccc",
                                backgroundColor: filteredStatus === status ? "#007bff" : "#fff",
                                color: filteredStatus === status ? "#fff" : "#000",
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="loading-text">Loading...</p>
                ) : (
                    <div className="wedding-list" style={{ display: "grid", gap: "20px" }}>
                        {filterWeddingForms(filteredStatus).map(renderWeddingForm)}
                    </div>
                )}
            </div>
        </div>
    );

};

export default WeddingList;
