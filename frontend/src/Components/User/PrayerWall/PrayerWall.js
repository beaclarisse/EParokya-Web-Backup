import React, { useState, useEffect } from "react";
import axios from "axios";
import GuestSidebar from '../../GuestSideBar';
import "../../Layout/styles/style.css";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const PrayerWall = () => {
  const [prayers, setPrayers] = useState([]);
  const [newPrayer, setNewPrayer] = useState({
    title: "",
    prayerRequest: "",
    prayerWallSharing: "anonymous",
    contact: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const prayersPerPage = 10;
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrayers, setTotalPrayers] = useState(0);
  const [loadingPrayerId, setLoadingPrayerId] = useState(null);
  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/profile`, config);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error.response ? error.response.data : error.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/prayer-wall?page=${currentPage}&limit=${prayersPerPage}`,
          { withCredentials: true }
        );

        const { prayers, total } = response.data;

        setPrayers(prayers);
        setTotalPrayers(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayers:", error);
        setLoading(false);
      }
    };

    fetchPrayers();
  }, [currentPage]);


  const handleNewPrayerSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a prayer.");
      return;
    }

    try {
      const prayerData = { ...newPrayer, userId: user._id };
      await axios.post(`${process.env.REACT_APP_API}/api/v1/submitPrayer`, prayerData, config);
      setNewPrayer({ title: "", prayerRequest: "", prayerWallSharing: "anonymous", contact: "" });
      alert("Successful! Please wait for the admin confirmation for your prayer to be posted");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error posting prayer:", error);
      alert("Failed to post prayer. Please try again.");
    }
  };

  const handleLike = async (prayerId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/toggleLike/${prayerId}`,
        {},
        { withCredentials: true }
      );

      setPrayers((prevPrayers) =>
        prevPrayers.map((prayer) =>
          prayer._id === prayerId
            ? {
              ...prayer,
              likes: response.data.likes,
              likedByUser: !prayer.likedByUser, 
            }
            : prayer
        )
      );
    } catch (error) {
      console.error("Error liking prayer:", error);
    }
  };


  const handleInclude = async (prayerId) => {
    if (!user) {
      alert("You must be logged in to include a prayer.");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/toggleInclude/${prayerId}`,
        {},
        { withCredentials: true }
      );

      const { includes, includedByUser } = response.data;

      setPrayers((prevPrayers) =>
        prevPrayers.map((prayer) =>
          prayer._id === prayerId
            ? {
              ...prayer,
              includeCount: response.data.includeCount,
              includedByUser: true,
            }
            : prayer
        )
      );
    } catch (error) {
      console.error("Error including prayer:", error);
    } finally {
      setLoadingPrayerId(null);
    }
  };




  return (
    <div className="prayer-wall-container">
      <div className="guest-sidebar">
        <GuestSidebar />
      </div>

      <div className="prayer-wall">
        <div className="prayer-share">
          <button
            onClick={() => setIsModalOpen(true)}
            className="share-button"
          >
            Share a Prayer
          </button>
        </div>

        {isModalOpen && (
          <>
            <div
              className="prayerModal-overlay"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="prayerModal">
              <h3>Share a Prayer</h3>
              <form onSubmit={handleNewPrayerSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={newPrayer.title}
                  onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
                />

                <textarea
                  placeholder="Your prayer request"
                  value={newPrayer.prayerRequest}
                  onChange={(e) => setNewPrayer({ ...newPrayer, prayerRequest: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="Contact"
                  value={newPrayer.contact}
                  onChange={(e) => setNewPrayer({ ...newPrayer, contact: e.target.value })}
                />

                <div>
                  <label>
                    <input
                      type="radio"
                      name="prayerWallSharing"
                      value="anonymous"
                      checked={newPrayer.prayerWallSharing === 'anonymous'}
                      onChange={(e) => setNewPrayer({ ...newPrayer, prayerWallSharing: e.target.value })}
                      required
                    />
                    Share anonymously
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="prayerWallSharing"
                      value="myName"
                      checked={newPrayer.prayerWallSharing === 'myName'}
                      onChange={(e) => setNewPrayer({ ...newPrayer, prayerWallSharing: e.target.value })}
                      required
                    />
                    Share with my name
                  </label>
                </div>

                <button type="submit">Post Prayer</button>
              </form>

              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </>
        )}

        {loading ? (
          <p>Loading prayers...</p>
        ) : (
          prayers.map((prayer) => (
            <div className="prayer-box" key={prayer._id}>
              <div className="prayer-header">
                <img
                  src={
                    prayer.prayerWallSharing === "anonymous"
                      ? "/public/../../../../EPAROKYA-SYST.png"
                      : prayer.user?.avatar?.url || "/path/to/default-avatar.png"
                  }
                  alt="Profile"
                  className="avatar"
                />
                <span>{prayer.prayerWallSharing === "anonymous" ? "Anonymous" : prayer.user?.name || "Unknown User"}</span>
              </div>

              <h4 className="prayer-title">{prayer.title}</h4>
              <p className="prayer-description">{prayer.prayerRequest}</p>
              <div className="prayer-actions">
                
                <div onClick={() => handleLike(prayer._id)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                  {prayer.likedByUser ? (
                    <FaHeart style={{ color: "red", fontSize: "1.5rem", transition: "transform 0.2s" }} />
                  ) : (
                    <CiHeart style={{ color: "gray", fontSize: "1.5rem", transition: "transform 0.2s" }} />
                  )}
                  <span style={{ fontSize: "1.2rem" }}>{prayer.likes || 0}</span>
                </div>

                <span style={{ marginLeft: "5px", fontSize: "1.2rem" }}>{prayer.likes || 0}</span>


                <button
                  onClick={() => handleInclude(prayer._id)}
                  disabled={prayer.includedByUser || loadingPrayerId === prayer._id}
                >
                  {loadingPrayerId === prayer._id
                    ? "Processing..."
                    : prayer.includedByUser
                      ? "You have included this in your prayer"
                      : `Include (${prayer.includeCount || 0})`}
                </button>;

                <span className="included-count">
                  Users who have included and prayed for you: {prayer.includeCount || 0}
                </span>

              </div>
              <div className="prayer-meta">
                <span>Created: {new Date(prayer.createdAt).toLocaleDateString()}</span>
                {prayer.confirmedAt && (
                  <span>Confirmed: {new Date(prayer.confirmedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PrayerWall;
