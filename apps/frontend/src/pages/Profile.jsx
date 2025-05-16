import React, { useContext, useEffect } from 'react'
import { getProfile } from '../api';
import { AppContext } from '../context/AuthContext';

const Profile = () => {
    const token = localStorage.getItem("token");
    const {setUser} = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const profileResponse = await getProfile();
        console.log("profileResponse", profileResponse);
        if (profileResponse.success) {
          setUser(profileResponse.data);
        } else {
          setUser(null);
        }
      }
    };
    fetchUser();
  }, [token]);
  return (
    <div>
      Profile page
    </div>
  )
}

export default Profile
