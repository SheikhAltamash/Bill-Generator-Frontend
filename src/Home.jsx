import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import logo from "./assets/logo.png";
import p from "./assets/p.png"
const Home = () => {
  return (
    <div className="main_home">
      <div className="home_main">
        <div className="nav">
          <h4 className="left">
            <img src={logo} alt="" />
            Anicomic Bill Generator
          </h4>
          <div className="right">
            <Link to="/form" className="home_link">
              New Bill
            </Link>
            <Link to="/all" className="home_link">
              All Bills
            </Link>
          </div>
        </div>
        <div className="hr_form"></div>
        <div className="img">
          <div className="img_under">
            <img
              src="https://cdn.usegalileo.ai/sdxl10/4929cf00-a413-4a4a-9d43-06d98d1f910b.png"
              alt="hello"
              className="img_h"
            />
          </div>
          <div className="mid_div">
            <h3> Create and send professional bills in seconds</h3>
            <p>
              Bill Generator is the easiest way to create , send and manage
              invoices .{" "}
            </p>
            <Link to={"/form"} className="btn_home btn_h">
              Create your first bill
            </Link>
          </div>
        </div>

        <div className="down">
          <h3>All Bills</h3>
          <p>View all your bills in one place</p>
          <h3>Previous Bills</h3>
          <p>View all your previous bills</p>
          <h3>How it works</h3>
          <p>
            Bill Generator has everything you need to streamline your billing
            process and get paid faster .{" "}
          </p>
          <Link to={"/all"} className="hone">
            View all Bills
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home