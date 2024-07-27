import { Description } from "./Description";
import "./bil.css";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pdf from "./assets/pdfimg.jpg";
export const Bill = ({ data }) => {
  const location = useLocation();
  let { formData, check } = location.state || {};
  if (check) {
    formData = check;
  }
  const navigate = useNavigate();
  let pdfRef = useRef();
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
      <div className="BILL_MAIN_TOP">
        <div className="root_BILL" ref={pdfRef}>
          <div className="main_bill">
        
            <h3 className="h3_BILL">
              INVOICE <span>{formData.invoiceNo}</span>{" "}
            </h3>
            <div className="mid_BILL">
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
          
          </div>
          <div className="img_bill_bg">
            <img className="pdf-background" src={pdf} />
          </div>
        </div>
      </div>
      {!check && (
        <div className="button">
          <button
            className="button_bill_BILL"
            onClick={() => {
              downloadPdf(2);
            }}
          >
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
        <button
          className="button_bill_BILL button"
          onClick={() => {
            downloadPdf(1);
          }}
        >
          {" "}
          Download Bill{" "}
        </button>
      )}
    </div>
  );
};
