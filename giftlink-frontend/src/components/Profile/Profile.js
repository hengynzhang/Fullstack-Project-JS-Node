import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './Profile.css'

const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const {setUserName} = useAppContext();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/app/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const email = sessionStorage.getItem("email");
            const name=sessionStorage.getItem('name');
            if (name && email) {
                    const storedUserDetails = {
                        name,
                        email
                    };
                    setUserDetails(storedUserDetails);
                    setUpdatedDetails(storedUserDetails);
            }
        } catch (error) {
            console.error('Error fetching using profile: ', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
        ...updatedDetails,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken || !email) {
                navigate("/app/login");
                return;
            }

            const payload = { ...updatedDetails };
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${authtoken}`,
                    'email': email
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setUserName(updatedDetails.name);
                sessionStorage.setItem('name', updatedDetails.name)
                setUserDetails(updatedDetails);
                setEditMode(false);
                // Display success message to the user
                setFeedbackMessage("Name Changed Successfully!");
                setTimeout(() => {
                    setFeedbackMessage("");
                    navigate("/");
                }, 3000);

            } else {
            throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error('Error updating profile', error);
            setFeedbackMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="profile-container">
        {editMode ? (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={userDetails.email}
                    disabled/>
                
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={updatedDetails.name}
                    onChange={handleInputChange}
                    retuired/>        

                <button type="submit">Save</button>
            </form>
        ) : (
        <div className="profile-details">
            <h1>Hi, {userDetails.name}</h1>
            <p> <b>Email:</b> {userDetails.email}</p>
            <button onClick={handleEdit}>Edit</button>
            <span 
                style={{
                    color:'green',
                    height:'.5cm',
                    display:'block',
                    fontStyle:'italic',
                    fontSize:'12px'}}>
            {feedbackMessage}
            </span>
            </div>
            )}
        </div>
    );
};

export default Profile;
