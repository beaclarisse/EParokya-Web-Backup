import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";
import SideBar from "../SideBar";
import "../../Layout/styles/style.css";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import { toast, ToastContainer } from 'react-toastify';


Modal.setAppElement("#root");

const FuneralDetails = () => {
    const { funeralId } = useParams();
    const [funeralDetails, setFuneralDetails] = useState(null);
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
    const [updatedFuneralDate, setUpdatedFuneralDate] = useState(funeralDetails?.funeralDate || "");


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deathCertificateImage, setDeathCertificateImage] = useState("");
    const [imageUrl, setImageUrl] = useState(null);


    const predefinedComments = [
        "Confirmed",
        "Pending Confirmation",
        "Rescheduled",
        "Cancelled",
    ];

    useEffect(() => {
        const fetchFuneralDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/getFuneral/${funeralId}`,
                    { withCredentials: true }
                );
                setFuneralDetails(response.data);
                setComments(response.data.comments || []);
                setDeathCertificateImage(response.data.deathCertificate || "");  // Assume `deathCertificate` field contains image URL
            } catch (err) {
                console.error("API Error:", err);
                setError("Failed to fetch funeral details.");
            } finally {
                setLoading(false);
            }
        };
        fetchFuneralDetails();
    }, [funeralId]);

    const handleConfirm = async (funeralId) => {
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/confirmFuneral/${funeralId}`,
                { withCredentials: true },

            );
            console.log("Confirmation response:", response.data);
            toast.success("Funeral confirmed successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error confirming funeral:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to confirm the funeral.",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                }
            );
        }
    };

    const handleDecline = async (funeralId, token) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/declineFuneral/${funeralId}`,
                { withCredentials: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Declining response:", response.data);
            toast.success("Funeral declined successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error decline funeral:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to decline the funeral.",
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
                `${process.env.REACT_APP_API}/api/v1/updateFuneralDate/${funeralDetails._id}`,
                { newDate, reason }
            );

            setUpdatedFuneralDate(response.data.funeral.funeralDate);
            alert("Funeral date updated successfully!");
        } catch (error) {
            console.error("Error updating funeral date:", error);
            alert("Failed to update funeral date.");
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
        // console.log("Sending comment:", commentData); 
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API}/api/v1/commentFuneral/${funeralId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            const data = await response.json();
            // console.log("Response from server:", data); 
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit comment.");
            }
            alert("Comment submitted successfully!");
        } catch (error) {
            console.error("Error submitting comment:", error);
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
        // console.log("Sending comment:", commentData); 
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API}/api/v1/addPriest/${funeralId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            const data = await response.json();
            // console.log("Response from server:", data); 
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit priest.");
            }
            alert("Priest submitted successfully!");
        } catch (error) {
            console.error("Error submitting priest:", error);
            alert("Failed to submit priest comment.");
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="funeral-details-container">
            <SideBar />
            <div className="funeral-details-content">
                <h1>Funeral Details</h1>
                <div className="details">
                    <p>Name: {funeralDetails?.name || "N/A"}</p>
                    <p>Age: {funeralDetails?.age || "N/A"}</p>
                    <p>Contact Person: {funeralDetails?.contactPerson || "N/A"}</p>
                    <p>Relationship: {funeralDetails?.relationship || "N/A"}</p>
                    <p>Phone: {funeralDetails?.phone || "N/A"}</p>
                    <p>Address: {funeralDetails?.address?.state || "N/A"}, {funeralDetails?.address?.country || "N/A"}, {funeralDetails?.address?.zip || "N/A"}</p>
                    <p>Place of Death: {funeralDetails?.placeOfDeath || "N/A"}</p>
                    <p>Funeral Date: {funeralDetails?.funeralDate ? new Date(funeralDetails.funeralDate).toLocaleDateString() : "N/A"}</p>
                    <p>Time: {funeralDetails?.funeraltime || "N/A"}</p>
                    <p>Service Type: {funeralDetails?.serviceType || "N/A"}</p>
                    <p>Priest Visit: {funeralDetails?.priestVisit || "N/A"}</p>
                    <p>Reason of Death: {funeralDetails?.reasonOfDeath || "N/A"}</p>
                    <p>Funeral Mass Date: {funeralDetails?.funeralMassDate ? new Date(funeralDetails.funeralMassDate).toLocaleDateString() : "N/A"}</p>
                    <p>Funeral Mass Time: {funeralDetails?.funeralMasstime || "N/A"}</p>
                    <p>Funeral Mass: {funeralDetails?.funeralMass || "N/A"}</p>
                    <p>Funeral Status: {funeralDetails?.funeralStatus || "N/A"}</p>
                    <p>Confirmed At: {funeralDetails?.confirmedAt ? new Date(funeralDetails.confirmedAt).toLocaleDateString() : "N/A"}</p>
                    {funeralDetails?.placingOfPall?.by && (
                        <p>Placing of Pall by: {funeralDetails.placingOfPall.by}</p>
                    )}
                    {funeralDetails?.placingOfPall?.familyMembers?.length > 0 && (
                        <p>Family Members Placing Pall: {funeralDetails.placingOfPall.familyMembers.join(", ")}</p>
                    )}
                </div>

                {funeralDetails?.deathCertificate && (
                    <div className="death-certificate-container">
                        <img
                            src={funeralDetails.deathCertificate.url}
                            alt="Death Certificate"
                            onClick={() => {
                                setImageUrl(funeralDetails.deathCertificate.url);
                                setIsModalOpen(true);
                            }}
                            className="death-certificate-thumbnail"
                        />
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Death Certificate Preview"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <button onClick={() => setIsModalOpen(false)} className="close-modal-button">Close</button>
                    <div className="modal-content">
                        <img
                            src={imageUrl}
                            alt="Death Certificate"
                            className="death-certificate-modal-image"
                        />
                    </div>
                </Modal>

                {/* Admin Display of Comment */}
                <div className="admin-comments-section">
                    <h2>Admin Comments</h2>
                    {comments.length > 0 ? (
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
                <div className="wedding-date-box">
                    <h3>Updated Funeral Date</h3>
                    <p className="date">
                        {updatedFuneralDate ? new Date(updatedFuneralDate).toLocaleDateString() : "N/A"}
                    </p>

                    {funeralDetails?.adminRescheduled?.reason && (
                        <div className="reschedule-reason">
                            <h3>Reason for Rescheduling</h3>
                            <p>{funeralDetails.adminRescheduled.reason}</p>
                        </div>
                    )}
                </div>

                {/* Admin wedding Date  */}
                <div className="admin-section">
                    <h2>Select Updated Funeral Date:</h2>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <label>Reason:</label>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>

                 {/* Display of Priest */}
                 <div className="admin-comments-section">
                    <h2>Priest</h2>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="admin-comment">
                                <p><strong>Priest:</strong> {comment?.priest || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No priest.</p>
                    )}
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
                    <button onClick={() => handleConfirm(funeralId)}>Confirm Funeral</button>
                    <button onClick={() => handleDecline(funeralId)}>Decline</button>
                    <button onClick={handleUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Update Funeral Date"}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default FuneralDetails;
