import { Description } from "./Description";
import "./bil.css";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import jsPdf, { jsPDF } from "jspdf";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation } from "react-router-dom";
import p2 from "./assets/p2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Bill = ({ data }) => {
  const location = useLocation();
  let { formData, check } = location.state || {};
  if (check) {
    formData = check;
  }
  const navigate = useNavigate();
  let pdfRef = useRef();
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  let UploadData = async (formData) => {
    try {
      let data = await axios.post(
        "https://bill-generator-backend.onrender.com/get",
        { formData }
      );
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const downloadPdf = async (check) => {
    if (check==2) {
   
      UploadData(formData);
 }    navigate("/");
  
    const input = pdfRef.current;
    const canvas = await html2canvas(input, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });

    try {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 190;
      const height = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      pdf.save(`${formData.invoiceNo}.pdf`);
    
    } catch (error) {
      console.error("Error loading image: ", error);
    }
  };

  return (
    <div>
      <Link className="btn_back_BILL" to={"/"}>
        <ArrowBackIcon className="icon_form_BILL"></ArrowBackIcon>
      </Link>

      <div className="root_BILL" ref={pdfRef}>
        <div className="top_BILL">
          <div className="left_bill_BILL">
            <img src={p2} alt="" className="img_bill" />
            <div className="under_left_bill">
              <h2>ANICOMIC INDIA </h2>
              <br />
              <h3> STUDIO AND SERVICES </h3>
            </div>
          </div>
        </div>
        <div className="hr_BILL"></div>

        <div className="mid_BILL">
          <h3 className="h3_BILL">
            INVOICE <span>{formData.invoiceNo}</span>{" "}
          </h3>
          <div className="mid_bill">
            <p className="p_bill_BILL">
              <span className="head_BILL"> BILLED TO : </span>{" "}
              <span className="s_BILL">{formData.customerName}</span>
            </p>
            <p className="p_bill_BILL">
              <span className="head_BILL"> ADDRESS: </span>{" "}
              <span className="s_BILL">{formData.customerAddress} </span>
            </p>{" "}
            <p className="p_bill_BILL">
              <span className="head_BILL"> EMAIL: </span>{" "}
              <span className="s_BILL">{formData.customerEmail} </span>
            </p>
            <p className="p_bill_BILL">
              <span className="head_BILL">DATE : </span>
              <span className="s_BILL">
                {" "}
                {new Date(formData.date).toLocaleDateString()}
              </span>
            </p>
          </div>

          <Description formData={formData}></Description>
        </div>
        <div className="contact_BILL">
          <div className="p_BILL">
            <h5>Our Phone</h5>
            <p>
              {" "}
              <PhoneIcon className="p_c_BILL"></PhoneIcon>8605688071
            </p>
          </div>
          <div className="e_BILL">
            <h5>Our Email</h5>
            <p>
              <EmailIcon className="p_c_BILL"></EmailIcon>
              anicomicindia@gmail.com
            </p>
          </div>
          <div className="a_BILL">
            <h5>Our Address</h5>
            <p>
              {" "}
              <LocationOnIcon className="p_c_BILL"></LocationOnIcon>Patel nagar
              ,Kanhan
            </p>
          </div>
        </div>
      </div>
      {!check && (
        <div className="button">
          <button className="button_bill_BILL" onClick={()=>{downloadPdf(2)}}>
            {" "}
            Download Bill and Upload to Server{" "}
          </button>
          <button
            className="button_bill_BILL one_BILL"
            onClick={() => {
              navigate("/form", { state: { formDataB: formData } });
            }}
          >
            EDIT Bill
          </button>
        </div>
      )}
      {check && (
        <button className="button_bill_BILL button" onClick={()=>{downloadPdf(1)}}>
          {" "}
          Download Bill{" "}
        </button>
      )}
    </div>
  );
};
