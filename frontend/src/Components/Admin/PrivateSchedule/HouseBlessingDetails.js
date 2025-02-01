import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import { toast, ToastContainer } from 'react-toastify';

Modal.setAppElement("#root");

const HouseBlessingsDetails = () => {
    const { blessingId } = useParams();
    const [blessingDetails, setBlessingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [priest, setPriest] = useState("");
    const [selectedComment, setSelectedComment] = useState("");
    const [rescheduledDate, setRescheduledDate] = useState("");
    const [rescheduledReason, setRescheduledReason] = useState("");
    const [additionalComment, setAdditionalComment] = useState("");
    const [comments, setComments] = useState([]);

    const [newDate, setNewDate] = useState("");
    const [reason, setReason] = useState("");
    const [updatedBlessingDate, setUpdatedBlessingDate] = useState(blessingDetails?.blessingDate || "");

    const predefinedComments = [
        "Confirmed",
        "Pending Confirmation",
        "Rescheduled",
        "Cancelled",
    ];

    useEffect(() => {
        const fetchBlessingDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/getHouseBlessing/${blessingId}`,
                    { withCredentials: true }
                );
                // console.log("API Response:", response.data);
                setBlessingDetails(response.data.houseBlessing);
                setComments(response.data.houseBlessing.comments || []);

            } catch (err) {
                // console.error("API Error:", err);
                setError("Failed to fetch house blessing details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlessingDetails();
    }, [blessingId]);

    const handleConfirm = async (blessingId) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/${blessingId}/confirmBlessing`,
                { withCredentials: true }
            );
            // console.log("Confirmation response:", response.data);
            toast.success("House blessing confirmed successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            // console.error("Error confirming house blessing:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to confirm the house blessing.",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                }
            );
        }
    };

    const handleDecline = async (blessingId) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/${blessingId}/declineBlessing`,
                { withCredentials: true }
            );
            console.log("Declining response:", response.data);
            toast.success("House blessing declined successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error declining house blessing:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to decline the house blessing.",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                }
            );
        }
    };

    const handleUpdate = async () => {
        if (!newDate || !reason) {
            alert("Please select a date and provide a reason.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/updateHouseBlessingDate/${blessingId}`,
                { newDate, reason }
            );

            setUpdatedBlessingDate(response.data.blessingDate);
            alert("Blessing date updated successfully!");
        } catch (error) {
            console.error("Error updating blessing date:", error);
            alert("Failed to update blessing date.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async () => {
        if (!selectedComment && !additionalComment) {
            alert("Please select or enter a comment.");
            return;
        }
        const commentData = {
            selectedComment: selectedComment || "",
            additionalComment: additionalComment || "",
        };
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API}/api/v1/${blessingId}/commentBlessing`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit comment.");
            }
            alert("Comment submitted successfully!");
        } catch (error) {
            // console.error("Error submitting comment:", error);
            alert("Failed to submit comment.");
        }
    };

    const handleAddPriest = async () => {
        if (!priest) {
            alert("Please enter priest name.");
            return;
        }
        const commentData = {
            priest: priest || "",
        };
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API}/api/v1/addPriest/${blessingId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit priest.");
            }
            alert("Priest submitted successfully!");
        } catch (error) {
            console.error("Error submitting priest:", error);
            alert("Failed to submit priest comment.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="house-blessing-details-container">
            <SideBar />
            <div className="house-blessing-details-content">
                <h1>House Blessing Details</h1>
                <div className="details">
                    <p>Full Name: {blessingDetails?.fullName || "N/A"}</p>
                    <p>Contact Number: {blessingDetails?.contactNumber || "N/A"}</p>
                    <p>Address: {blessingDetails?.address?.houseDetails || "N/A"},
                        {blessingDetails?.address?.phase || "N/A"},
                        {blessingDetails?.address?.street || "N/A"},
                        {blessingDetails?.address?.baranggay || "N/A"},
                        {blessingDetails?.address?.district || "N/A"},
                        {blessingDetails?.address?.city || "N/A"}</p>
                    <p>Blessing Date: {blessingDetails?.blessingDate ? new Date(blessingDetails.blessingDate).toLocaleDateString() : "N/A"}</p>
                    <p>Blessing Time: {blessingDetails?.blessingTime || "N/A"}</p>
                    <p>Blessing Status: {blessingDetails?.blessingStatus || "N/A"}</p>
                    <p>Confirmed At: {blessingDetails?.confirmedAt ? new Date(blessingDetails.confirmedAt).toLocaleDateString() : "N/A"}</p>
                </div>

                {/* Admin Display of Comment */}
                <div className="admin-comments-section">
                    <h2>Admin Comments</h2>
                    {(comments && comments.length > 0) ? (
                        comments.map((comment, index) => (
                            <div key={index} className="admin-comment">
                                <p><strong>Selected Comment:</strong> {comment?.selectedComment || "N/A"}</p>
                                <p><strong>Additional Comment:</strong> {comment?.additionalComment || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No admin comments yet.</p>
                    )}

                </div>

                {/* for Rescheduling */}
                <div className="blessing-date-box">
                    <h3>Updated Blessing Date</h3>
                    <p className="date">
                        {blessingDetails?.adminRescheduled?.date ? new Date(blessingDetails.adminRescheduled.date).toLocaleDateString() : "N/A"}
                    </p>

                    {blessingDetails?.adminRescheduled?.reason && (
                        <div className="reschedule-reason">
                            <h3>Reason for Rescheduling</h3>
                            <p>{blessingDetails.adminRescheduled.reason}</p>
                        </div>
                    )}
                </div>

                {/* Admin Blessing Date */}
                <div className="admin-section">
                    <h2>Select Updated Blessing Date:</h2>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <label>Reason:</label>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>

                {/* Display of Priest */}
                <div className="admin-comments-section">
                    <h2>Priest</h2>
                    <p><strong>Priest:</strong> {blessingDetails?.priest || "N/A"}</p>

                </div>

                {/* Admin Creating a Comment */}
                <div className="admin-section">
                    <h2>Submit Admin Comment</h2>
                    <select
                        value={selectedComment}
                        onChange={(e) => setSelectedComment(e.target.value)}
                    >
                        <option value="" disabled>Select a comment</option>
                        {predefinedComments.map((comment, index) => (
                            <option key={index} value={comment}>{comment}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Additional Comments"
                        value={additionalComment}
                        onChange={(e) => setAdditionalComment(e.target.value)}
                    />
                    <button onClick={handleSubmitComment}>Submit Comment</button>
                </div>

                {/* Adding of Priest */}
                <div className="admin-section">
                    <h2>Priest Name</h2>
                    <textarea
                        placeholder="Priest Name"
                        value={priest}
                        onChange={(e) => setPriest(e.target.value)}
                    />
                    <button onClick={handleAddPriest}>Add Priest</button>
                </div>

                <div className="button-container">
                    <button onClick={() => handleConfirm(blessingId)}>Confirm Blessing</button>
                    <button onClick={() => handleDecline(blessingId)}>Decline</button>
                    <button onClick={handleUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Update Blessing Date"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HouseBlessingsDetails;