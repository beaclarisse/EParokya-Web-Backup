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
    const [totalPrayers, setTotalPrayers] = useState(0);
    const [newPrayer, setNewPrayer] = useState({
        title: "",
        prayerRequest: "",
        prayerWallSharing: "anonymous",
        contact: "",
    });
    const [user, setUser] = useState(null);

    const config = {
        withCredentials: true,
    };

    // Fetch prayers
    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/prayer-wall?status=Confirmed&page=${currentPage}`
                );
                setPrayers(response.data.prayers || []);
                setTotalPrayers(response.data.total || 0);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching prayers:", error);
                setLoading(false);
            }
        };

        fetchPrayers();
    }, [currentPage]);

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/profile`, config);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    // Handle prayer submission
    const handleNewPrayerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/submitPrayer`,
                newPrayer,
                config
            );
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

    // Handle like functionality
    const handleLike = async (prayerId) => {
        try {
            await axios.put(`${process.env.REACT_APP_API}/api/v1/toggle-like/${prayerId}`);
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId
                        ? {
                            ...prayer,
                            likes: prayer.likedByUser ? prayer.likes - 1 : prayer.likes + 1,
                            likedByUser: !prayer.likedByUser,
                        }
                        : prayer
                )
            );
        } catch (error) {
            console.error("Error liking prayer:", error);
        }
    };

    // Handle include in prayer
    const handleIncludeInPrayer = async (prayerId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/api/v1/${prayerId}/include`);
            setPrayers((prev) =>
                prev.map((prayer) =>
                    prayer._id === prayerId
                        ? {
                            ...prayer,
                            includes: prayer.includedByUser ? prayer.includes - 1 : prayer.includes + 1,
                            includedByUser: !prayer.includedByUser,
                        }
                        : prayer
                )
            );
        } catch (error) {
            console.error("Error including prayer:", error);
        }
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="prayer-wall-container">
            {/* Guest Sidebar */}
            <div className="guest-sidebar">
                <GuestSideBar />
            </div>

            {/* Main Prayer Wall */}
            <div className="prayer-wall">
                {/* Prayer Form */}
                <div className="prayer-post-container">
                    <form className="prayer-form" onSubmit={handleNewPrayerSubmit}>
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
                </div>

                {/* Prayer List */}
                {loading ? (
                    <p>Loading prayers...</p>
                ) : (
                    prayers.map((prayer) => (
                        <div className="prayer-box" key={prayer._id}>
                            <h4>{prayer.title}</h4>
                            <p>{prayer.prayerRequest}</p>
                            <button onClick={() => handleLike(prayer._id)}>
                                {prayer.likedByUser ? "Unlike" : "Like"} ({prayer.likes})
                            </button>
                            <button onClick={() => handleIncludeInPrayer(prayer._id)}>
                                {prayer.includedByUser ? "Uninclude" : "Include"} ({prayer.includes})
                            </button>
                        </div>
                    ))
                )}

                {/* Pagination */}
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
        </div>
    );
};


export default PrayerWall;
