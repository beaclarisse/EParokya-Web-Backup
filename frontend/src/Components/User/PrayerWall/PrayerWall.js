import React, { useEffect, useState } from "react";
import axios from "axios";
import GuestSideBar from "../../GuestSideBar";
import "../../Layout/styles/style.css";
import { FaPrayingHands, FaHeart } from "react-icons/fa";
import ParishionerImage from "../../../assets/images/EPAROKYA-SYST.png";

const PrayerWall = () => {
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [prayersPerPage] = useState(10);
    const [newPrayer, setNewPrayer] = useState({
        title: "",
        prayerRequest: "",
        prayerWallSharing: "anonymous",
        contact: "",
    });
    const userId = "mockUserId"; // Replace with actual user ID from authentication

    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/prayer-wall?page=${currentPage}`
                );
                setPrayers(response.data.prayers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching prayers:", error);
            }
        };

        fetchPrayers();
    }, [currentPage]);

    const handleLike = async (prayerId) => {
        try {
            await axios.put(`${process.env.REACT_APP_API}/api/prayer-wall/toggle-like/${prayerId}`);
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId
                        ? {
                              ...prayer,
                              likes: prayer.likes + 1,
                              likedByUser: true,
                          }
                        : prayer
                )
            );
        } catch (error) {
            console.error("Error liking prayer:", error);
        }
    };

    const handleIncludeInPrayer = async (prayerId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/api/prayer-wall/${prayerId}/include`);
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId
                        ? {
                              ...prayer,
                              includes: prayer.includes + 1,
                              includedByUser: true,
                          }
                        : prayer
                )
            );
        } catch (error) {
            console.error("Error including prayer:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleNewPrayerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/prayer-wall`, {
                ...newPrayer,
                userId,
            });
            setPrayers([response.data.prayer, ...prayers]);
            setNewPrayer({
                title: "",
                prayerRequest: "",
                prayerWallSharing: "anonymous",
                contact: "",
            });
        } catch (error) {
            console.error("Error posting new prayer:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="prayer-wall-container">
            <GuestSideBar />
            <div className="prayer-wall">
                <form className="prayer-form" onSubmit={handleNewPrayerSubmit}>
                    <h3>Post a Prayer</h3>
                    <input
                        type="text"
                        placeholder="Title (Optional)"
                        value={newPrayer.title}
                        onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Your prayer request"
                        value={newPrayer.prayerRequest}
                        onChange={(e) => setNewPrayer({ ...newPrayer, prayerRequest: e.target.value })}
                        required
                    />
                    <select
                        value={newPrayer.prayerWallSharing}
                        onChange={(e) => setNewPrayer({ ...newPrayer, prayerWallSharing: e.target.value })}
                    >
                        <option value="anonymous">Post as Anonymous</option>
                        <option value="myName">Post with My Name</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Contact (Optional)"
                        value={newPrayer.contact}
                        onChange={(e) => setNewPrayer({ ...newPrayer, contact: e.target.value })}
                    />
                    <button type="submit">Post Prayer</button>
                </form>

                {prayers.length === 0 ? (
                    <div className="no-prayers">
                        <h2>No prayers yet.</h2>
                        <p>Be the first to post a prayer!</p>
                    </div>
                ) : (
                    prayers.map((prayer) => (
                        <div className="prayer-box" key={prayer._id}>
                            <div className="prayer-header">
                                <img
                                    src={
                                        prayer.prayerWallSharing === "anonymous"
                                            ? ParishionerImage
                                            : prayer.user.profilePicture
                                    }
                                    alt="Profile"
                                    className="profile-picture"
                                />
                                <h3>
                                    {prayer.prayerWallSharing === "anonymous"
                                        ? "Parishioner"
                                        : prayer.user.name}
                                </h3>
                            </div>
                            <div className="prayer-content">
                                <h4>{prayer.title}</h4>
                                <p>{prayer.prayerRequest}</p>
                            </div>
                            <div className="prayer-actions">
                                <button
                                    className="like-button"
                                    onClick={() => handleLike(prayer._id)}
                                    disabled={prayer.likedByUser}
                                >
                                    <FaHeart className={prayer.likedByUser ? "liked" : ""} />
                                    {prayer.likes}
                                </button>
                                <button
                                    className="include-button"
                                    onClick={() => handleIncludeInPrayer(prayer._id)}
                                    disabled={prayer.includedByUser}
                                >
                                    I will include this in my prayer
                                </button>
                                <span className="include-count">
                                    Users who included this in their prayer:{" "}
                                    <span style={{ color: "#154314" }}>{prayer.includes}</span>
                                </span>
                            </div>
                        </div>
                    ))
                )}

                <div className="pagination">
                    {Array.from({ length: Math.ceil(prayers.total / prayersPerPage) }, (_, i) => (
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
        </div>
    );
};

export default PrayerWall;
