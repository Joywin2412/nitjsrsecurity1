import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import { Route, Link } from "react-router-dom";
import { useGlobalContext } from "./context.js";
import Footer from "./Footer.js";
import img1 from "./images/abt1.png";
import img2 from "./images/abt2.jpg";
const Home = () => {
  const [profile, setProfile] = useState(1);
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail } = useGlobalContext();
  console.log(name, name2);
  useEffect(() => {
    // only name and email
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
  }, []);
  if (name) {
    t1 = name;
    t2 = email;
  }
  if (profile) {
    return (
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
          rel="stylesheet"
        ></link>
        <Navbar profile={profile} setProfile={setProfile} show={1} />
        {/* <p> This is a farmer app</p> */}

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
          rel="stylesheet"
        ></link>
        <Navbar profile={profile} setProfile={setProfile} show={1} />
      </div>
    );
  }
};

export default Home;