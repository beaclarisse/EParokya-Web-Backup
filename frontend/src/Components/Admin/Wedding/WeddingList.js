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
            navigateToDetails(item._id);
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
                ? "#4caf50"
                : weddingStatus === "Declined"
                    ? "#ff5722"
                    : "#ffd700";

        return (
            <div
                key={item._id}
                className={`wedding-card ${weddingStatus?.toLowerCase() || ""}`}
                onClick={() => handleCardClick(item)}
                style={{ borderLeft: `6px solid ${statusColor}` }}
            >
                <div className="status-badge">{weddingStatus || "Unknown"}</div>
                <h3 className="card-title">{bride && groom ? `${bride} & ${groom}` : "Names not available"}</h3>
                <div className="card-details">
                    <p>
                        <strong>Wedding Date:</strong> {weddingDate ? new Date(weddingDate).toLocaleDateString() : "N/A"}
                    </p>
                    <p>
                        <strong>Attendees:</strong> {attendees ?? "N/A"}
                    </p>
                    <p>
                        <strong>Flower Girl:</strong> {flowerGirl || "N/A"} |{" "}
                        <strong>Ring Bearer:</strong> {ringBearer || "N/A"}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <SideBar />
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <h1 className="wedding-title">Wedding Forms</h1>

                <div className="wedding-filters">
                    {["All", "Confirmed", "Pending", "Declined"].map((status) => (
                        <button
                            key={status}
                            className={`wedding-filter-button ${filteredStatus === status ? "active" : ""}`}
                            onClick={() => setFilteredStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="loading-text">Loading...</p>
                ) : (
                    <div className="wedding-list">
                        {filterWeddingForms(filteredStatus).map(renderWeddingForm)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeddingList;
