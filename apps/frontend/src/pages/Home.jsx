import React, { useContext } from "react";
import { AppContext } from "../context/AuthContext";

const Home = () => {
    const {user, token} = useContext(AppContext);
    console.log("user", user);
    console.log("token", token);
  return <div>Home page</div>;
};

export default Home;
