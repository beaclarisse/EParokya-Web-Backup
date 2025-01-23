import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";

const AdminPrayerReview = () => {
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [prayersPerPage] = useState(10);
    const [totalPrayers, setTotalPrayers] = useState(0);
    const [user, setUser] = useState(null);

    const config = {
        withCredentials: true,
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/profile`, config);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error.response ? error.response.data : error.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/getAllPrayers?page=${currentPage}&limit=${prayersPerPage}`,
                    config 
                );
                setPrayers(response.data.prayers || []);
                setTotalPrayers(response.data.total || 0);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching prayers:", error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };

        fetchPrayers();
    }, [currentPage]);

    const handleApprove = async (prayerId) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API}/api/v1/admin/approvePrayer/${prayerId}`,
                {},
                config 
            );
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId ? { ...prayer, prayerWallStatus: "Confirmed" } : prayer
                )
            );
        } catch (error) {
            console.error("Error approving prayer:", error.response ? error.response.data : error.message);
        }
    };

    const handleReject = async (prayerId) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API}/api/v1/admin/rejectPrayer/${prayerId}`,
                {},
                config 
            );
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId ? { ...prayer, prayerWallStatus: "Cancelled" } : prayer
                )
            );
        } catch (error) {
            console.error("Error rejecting prayer:", error.response ? error.response.data : error.message);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="admin-review-container">
            {loading ? (
                <p>Loading prayers...</p>
            ) : prayers.length === 0 ? (
                <p>No pending prayers to review.</p>
            ) : (
                <div>
                    {prayers.map((prayer) => (
                        <div className="prayer-box" key={prayer._id}>
                            <h3>{prayer.title}</h3>
                            <p>{prayer.prayerRequest}</p>
                            <p>
                                <strong>Status:</strong> {prayer.prayerWallStatus}
                            </p>
                            <p>
                                <strong>Contact:</strong> {prayer.contact}
                            </p>
                            <button onClick={() => handleApprove(prayer._id)}>Approve</button>
                            <button onClick={() => handleReject(prayer._id)}>Reject</button>
                        </div>
                    ))}

                    <div className="pagination">
                        {Array.from({ length: Math.ceil(totalPrayers / prayersPerPage) }, (_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPrayerReview;
