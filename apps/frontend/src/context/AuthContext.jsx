import React, { createContext, useEffect, useState } from "react";
import { getProfile } from "../api";

// create context
export const AppContext = createContext();

export const AuthContext = ({ children }) => {
  // const AuthContext = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const profileResponse = await getProfile(token);
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
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};
//   return <div></div>;
// };

// export default AuthContext;
// export default AppProvider;
