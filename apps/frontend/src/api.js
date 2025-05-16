// const API_BASE_URL = "http://localhost:4001"; // change if needed
// const API_BASE_URL = process.env.API_BASE_URL; // change if needed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // change if needed

const getToken = localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  // Authorization: `Bearer ${getToken()}`,
  Authorization: getToken,
});

// Signup
export const signup = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      // const res = await fetch(`/auth/signup`, {
      // const res = await fetch(`http://localhost:4001/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    console.log("res", res);
    // return ;
    return await res.json();
  } catch (err) {
    console.error("Signup Error:", err);
    return { success: false, msg: "Signup failed" };
  }
};

// Login
export const login = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    return { success: false, msg: "Login failed" };
  }
};

// Get Profile
export const getProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: headers(),
    });
    return await res.json();
  } catch (err) {
    console.error("Get Profile Error:", err);
    return { success: false, msg: "Failed to fetch profile" };
  }
};

// Update Profile
export const updateProfile = async (updates) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(updates),
    });
    return await res.json();
  } catch (err) {
    console.error("Update Profile Error:", err);
    return { success: false, msg: "Update failed" };
  }
};

// Reset Password
export const resetPassword = async (passwordData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(passwordData),
    });
    return await res.json();
  } catch (err) {
    console.error("Reset Password Error:", err);
    return { success: false, msg: "Password reset failed" };
  }
};
