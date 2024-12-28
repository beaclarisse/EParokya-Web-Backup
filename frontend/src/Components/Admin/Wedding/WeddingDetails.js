import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Layout/styles/style.css";
import SideBar from "../SideBar";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const WeddingDetails = () => {
    const { weddingId } = useParams();
    console.log("Wedding ID:", weddingId);

    const navigate = useNavigate();
    const [weddingDetails, setWeddingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [priest, setPriest] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedComment, setSelectedComment] = useState("");
    const [rescheduledDate, setRescheduledDate] = useState("");
    const [rescheduledReason, setRescheduledReason] = useState("");
    const [additionalComment, setAdditionalComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchWeddingDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/getWeddingById/${weddingId}`,
                    { withCredentials: true },
                   
                );
                console.log("API Response:", response.data);
                setWeddingDetails(response.data);
                setComments(response.data.comments || []);
            } catch (err) {
                console.error("API Error:", err);
                setError("Failed to fetch wedding details.");
            } finally {
                setLoading(false);
            }
        };
        fetchWeddingDetails();
    }, [weddingId]);

    const predefinedComments = [
        "Confirmed",
        "Pending Confirmation",
        "Rescheduled",
        "Cancelled"
      ];

      const handleSubmitComment = () => {
        console.log({
          priest,
          selectedDate,
          selectedComment,
          rescheduledDate,
          rescheduledReason,
          additionalComment
        });
      };

      const handleConfirm = async (weddingId) => {
        try {
            
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/${weddingId}/confirm`,
                { withCredentials: true },
                
            );
            console.log("Confirmation response:", response.data);
            toast.success("Wedding confirmed successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,  
            });
        } catch (error) {
            console.error("Error confirming wedding:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to confirm the wedding.",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,  
                }
            );
        }
    };
    
      
    
      const handleDecline = async (weddingId, token) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/${weddingId}/decline`,
            { withCredentials: true },
            {   
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
          );
          console.log("Declining response:", response.data);
          toast.success("Wedding declined successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        } catch (error) {
          console.error("Error decline wedding:", error.response || error.message);
          toast.error(
            error.response?.data?.message || "Failed to decline the wedding.",
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            }
          );
        }
      };
    

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;
   
    return (
        <div className="wedding-details-page">
          <SideBar />
          <div className="wedding-details-content">
            <h1>Wedding Details</h1>
            <div className="details">
              <p>Bride Name: {weddingDetails?.bride || "N/A"}</p>
              <p>Bride Age: {weddingDetails?.brideAge || "N/A"}</p>
              <p>Bride Gender: {weddingDetails?.brideGender || "N/A"}</p>
              <p>Bride Phone: {weddingDetails?.bridePhone || "N/A"}</p>
              <p>Bride Address: 
                {weddingDetails?.brideAddress?.state}, 
                {weddingDetails?.brideAddress?.zip}, 
                {weddingDetails?.brideAddress?.country}
              </p>
    
              <p>Groom Name: {weddingDetails?.groom || "N/A"}</p>
              <p>Groom Age: {weddingDetails?.groomAge || "N/A"}</p>
              <p>Groom Gender: {weddingDetails?.groomGender || "N/A"}</p>
              <p>Groom Phone: {weddingDetails?.groomPhone || "N/A"}</p>
              <p>Groom Address: 
                {weddingDetails?.groomAddress?.state}, 
                {weddingDetails?.groomAddress?.zip}, 
                {weddingDetails?.groomAddress?.country}
              </p>
    
              <p>Bride Relative: {weddingDetails?.BrideRelative || "N/A"}</p>
              <p>Bride Relationship: {weddingDetails?.BrideRelationship || "N/A"}</p>
              <p>Groom Relative: {weddingDetails?.GroomRelative || "N/A"}</p>
              <p>Groom Relationship: {weddingDetails?.GroomRelationship || "N/A"}</p>
              <p>Attendees: {weddingDetails?.attendees || "N/A"}</p>
              <p>Flower Girl: {weddingDetails?.flowerGirl || "N/A"}</p>
              <p>Ring Bearer: {weddingDetails?.ringBearer || "N/A"}</p>
              <p>Wedding Date: {weddingDetails?.weddingDate ? new Date(weddingDetails.weddingDate).toLocaleDateString() : "N/A"}</p>
    
              <p>Bride Birth Certificate: {weddingDetails?.brideBirthCertificate || "N/A"}</p>
              <p>Groom Birth Certificate: {weddingDetails?.groomBirthCertificate || "N/A"}</p>
              <p>Bride Baptismal Certificate: {weddingDetails?.brideBaptismalCertificate || "N/A"}</p>
              <p>Groom Baptismal Certificate: {weddingDetails?.groomBaptismalCertificate || "N/A"}</p>
              <p>Wedding Status: {weddingDetails?.weddingStatus || "Pending"}</p>
            </div>
    
            <div className="admin-comments-section">
              <h2>Admin Comments</h2>
              {weddingDetails?.comments?.length > 0 ? (
                weddingDetails.comments.map((comment, index) => (
                  <div key={index} className="admin-comment">
                    <p>Priest: {comment?.priest || "N/A"}</p>
                    <p>Scheduled Date: {comment?.scheduledDate ? new Date(comment.scheduledDate).toLocaleDateString() : "Not set"}</p>
                    <p>Selected Comment: {comment?.selectedComment || "N/A"}</p>
                    <p>Additional Comment: {comment?.additionalComment || "N/A"}</p>
    
                    {comment?.adminRescheduled?.date && (
                      <p>
                        Rescheduled Date:{" "}
                        {new Date(comment.adminRescheduled.date).toLocaleDateString()}
                      </p>
                    )}
                    {comment?.adminRescheduled?.reason && (
                      <p>Rescheduling Reason: {comment.adminRescheduled?.reason || "N/A"}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No admin comments yet.</p>
              )}
            </div>
    
            <div className="admin-section">
              <h2>Submit Admin Comment</h2>
              <input
                type="text"
                placeholder="Priest Name"
                value={priest}
                onChange={(e) => setPriest(e.target.value)}
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <select
                value={selectedComment}
                onChange={(e) => setSelectedComment(e.target.value)}
              >
                <option value="" disabled>
                  Select a comment
                </option>
                {predefinedComments.map((comment, index) => (
                  <option key={index} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
              <input
                type="date"
                placeholder="Rescheduled Date (optional)"
                value={rescheduledDate}
                onChange={(e) => setRescheduledDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Reason for Rescheduling"
                value={rescheduledReason}
                onChange={(e) => setRescheduledReason(e.target.value)}
              />
              <textarea
                placeholder="Additional Comment (optional)"
                value={additionalComment}
                onChange={(e) => setAdditionalComment(e.target.value)}
              />
              <button onClick={handleSubmitComment}>Submit Comment</button>
            </div>
    
            <div className="button-container">
            <button onClick={() => handleConfirm(weddingId)}>Confirm Wedding</button>
            <button onClick={() => handleDecline(weddingId)}>Decline</button>
            </div>
          </div>
        </div>
      );
    };

export default WeddingDetails;
