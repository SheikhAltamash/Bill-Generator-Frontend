import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
const Home = () => {
  return (
    <div className='home_main'>
      <div className="nav">
        <h4 className="left">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_319)">
                <path
                  d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_319">
                  <rect width="48" height="48" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          Bill Generator
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
      <div className='hr_form'></div>
      <div className="img">
        <div className="img_under">
          <img
            src="https://cdn.usegalileo.ai/sdxl10/4929cf00-a413-4a4a-9d43-06d98d1f910b.png"
            alt="hello"
            className='img_h'
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

      <div className='down'>
        <h3>All Bills</h3>
        <p>
        View all your bills in one place 
        </p>
        <h3>Previous Bills</h3>
        <p>View all your previous bills</p>
        <h3>How it works</h3>
        <p>Bill Generator has everything you need to streamline your billing process and get paid faster . </p>
        <Link to={"/all"} className="hone">
          View all Bills
        </Link>
      </div>
    </div>
  );
}

export default Home