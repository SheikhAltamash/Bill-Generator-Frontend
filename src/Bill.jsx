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
import EditNoteIcon from "@mui/icons-material/EditNote";
import DownloadIcon from "@mui/icons-material/Download";
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
        {
          formData,
        }
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
            <h3 className="h3_BILL">INVOICE </h3>

            <div className="mid_BILL">
              <div className="mid_BILL_MAIN">
                <div className="mid_bill">
                  <p className="p_bill_BILL">
                    <span className="head_BILL"> SERVICE TYPE: </span>{" "}
                    <span className="s_BILL">{formData.typeOfService}</span>
                  </p>
                  <p className="p_bill_BILL">
                    <span className="head_BILL"> BILLED TO : </span>{" "}
                    <span className="s_BILL">{formData.customerName}</span>
                  </p>

                  <p className="p_bill_BILL">
                    <span className="head_BILL"> EMAIL: </span>{" "}
                    <span className="s_BILL">{formData.customerEmail} </span>
                  </p>
                </div>
                <div className="mid_right">
                  <p className="head_BILL">
                    <span className="head_BILL">BILL NO :</span>
                    <span className="s_INV">{formData.invoiceNo}</span>
                  </p>
                  <p className="p_bill_BILL">
                    <span className="head_BILL">DATE : </span>
                    <span className="s_BILL">
                      {" "}
                      {new Date(formData.date).toLocaleDateString()}
                    </span>
                  </p>
                  {formData.gst && (
                    <p className="p_bill_BILL">
                      <span className="head_BILL">GST NO : </span>
                      <span className="s_BILL"> {formData.gstNo}</span>
                    </p>
                  )}
                </div>
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
      <DownloadIcon></DownloadIcon>
          </button><br /><br />
          <button
            className="button_bill_BILL one_BILL"
            onClick={() => {
              navigate("/form", { state: { formDataB: formData } });
            }}
          >
           <EditNoteIcon></EditNoteIcon>
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
      <DownloadIcon></DownloadIcon>
        </button>
      )}
    </div>
  );
};
