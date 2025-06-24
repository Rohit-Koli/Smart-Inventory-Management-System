import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Authprovider";


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Sending email to backend:", user.email);
        const response = await axios.post(
          "http://localhost:8081/user/getUserWithEmail",
          { email: user.email },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    if (user && user.email) {
      fetchUser();
    }
  }, [user]);

  return (
    <div>
      <h2>This is Profile</h2>
      
        {!userProfile ? (
    <p>Loading user profile...</p>
  ) : (
    <div>
      <p><strong>Name:</strong> {userProfile.name}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
      <p><strong>About:</strong> {userProfile.about}</p>
      <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
      <p><strong>Provider:</strong> {userProfile.provider}</p>
    </div>
  )}

      <p>This is ENd of profile{(localStorage.getItem("user"))}</p>
    </div>
  );
};

export default Profile;