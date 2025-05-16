import React, { useContext } from "react";
import { AppContext } from "../context/AuthContext";

const Home = () => {
    const {user} = useContext(AppContext);
    console.log("user", user);
  return <div>Home page</div>;
};

export default Home;
