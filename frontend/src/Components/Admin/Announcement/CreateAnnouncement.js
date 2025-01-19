import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Layout/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideBar from '../SideBar';

export const CreateAnnouncement = () => { 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [richDescription, setRichDescription] = useState('');
    const [tags, setTags] = useState('');
    const [announcementCategory, setAnnouncementCategory] = useState('');
    const [categories, setCategories] = useState([]); // For holding fetched categories
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/getAllannouncementCategory`);
                setCategories(response.data); 
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Error fetching categories.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleVideoChange = (e) => {
        setVideos([...e.target.files]);
    };

    const config = {
        withCredentials: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('richDescription', richDescription);
        formData.append('tags', tags); 
        formData.append('announcementCategory', announcementCategory); 
        formData.append('isFeatured', isFeatured); 
    
        // Handle image upload (single or multiple)
        if (images.length > 0) {
            images.forEach(image => {
                formData.append('images', image); // Add 'images' for multiple images
            });
        }
    
        // Handle video upload (if any)
        if (videos.length > 0) {
            formData.append('video', videos[0]); // Add 'video' for a single video
        }
    
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/create/announcement`, formData, config, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            console.log('Announcement Post created:', response.data);
            navigate('/admin/announcementList');
            toast.success('Announcement Successfully Created.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            setLoading(false);
            console.error('Error creating Announcement:', error);
            toast.error('Error creating Announcement.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
    
    

    return (
        <div style={styles.wrapper}>
            <SideBar />
            <div style={styles.container}>
                <h2 style={styles.title}>Create a New Announcement</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Rich Description:</label>
                        <textarea
                            value={richDescription}
                            onChange={(e) => setRichDescription(e.target.value)}
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tags:</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Announcement Category:</label>
                        <select
                            value={announcementCategory}
                            onChange={(e) => setAnnouncementCategory(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Images:</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            required
                            style={styles.fileInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Videos:</label>
                        <input
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={handleVideoChange}
                            style={styles.fileInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Is Featured:</label>
                        <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                    </div>
                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Announcement'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        alignItems: 'flex-start', 
    },
    container: {
        flex: 1,
        maxWidth: '700px',
        margin: '40px auto 0 auto', 
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '25px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '5px',
        fontWeight: '500',
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    textarea: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        minHeight: '120px',
        resize: 'vertical',
    },
    fileInput: {
        fontSize: '16px',
        padding: '10px 0',
    },
    submitButton: {
        padding: '12px',
        borderRadius: '6px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    }
};

export default CreateAnnouncement;
