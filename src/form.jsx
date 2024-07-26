import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./form.css"
export default function Form() {
 const location = useLocation();
  const { formDataB} = location.state || {};
 
  let initialData = {
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    invoiceNo: "",
    date: "",
    total:"",
    services: {
      videoEditing: { selected: false, minutes: "", quality: "1080p",amount:"" },
      photoEditing: { selected: false, photos: "", quality: "1080p",amount:"" },
      graphicDesigning: { selected: false, type: "" ,amount:"" },
      gst: { selected: false },
    },
  };
  let data;
  if (formDataB) {
    data = formDataB;

  } else {
    data = initialData;
    console.log("initialData");
        console.log(formDataB);
    
}
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const pdfRef = useRef();
  const navigate = useNavigate();

  let validateInvoice = async () => {
    try {
      let invoice = formData.invoiceNo;
      let data = await axios.post("http://localhost:8080/invoiceCheck", { invoice });  
      if (data.data == "Alright") {
    
          console.log(formData);
          try {
            setFormData(initialData);
            navigate("/bill", { state: { formData: formData } });
          } catch (e) {
            console.log(e);
          }
        
      }
      else {
          setErrors((prevErrors) => ({
          ...prevErrors,
          invoiceNo: "Invoice number already exist !",
        }));
      
      }


    } catch (e) {
      console.log(e.message);
}


}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleServiceChange = (service, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      services: {
        ...prevData.services,
        [service]: {
          ...prevData.services[service],
          [key]: value,
        },
      },
    }));
  };


  const handleSubmit = async (e) => {
     e.preventDefault();
   
   
    const newErrors = {};

    if (!formData.customerName)
      newErrors.customerName = "Customer Name is required !";
    if (!formData.customerAddress)
      newErrors.customerAddress = "Customer Address is required !" ;
    if (!formData.customerEmail)
      newErrors.customerEmail = "Customer Email is required !";
    if (!formData.invoiceNo) newErrors.invoiceNo = "Invoice Number is required !";
    if (!formData.date) newErrors.date = "Date is required !";

 if (Object.keys(newErrors).length > 0) {
   setErrors(newErrors);
 } else {
   await validateInvoice();
 }
    
  };



  return (
    <div className="form_main_div">
      <Link className="btn_back" to={"/"}>
        <ArrowBackIcon className="icon_form" />
      </Link>

      <div className="form_div" ref={pdfRef}>
        <h1>Create an invoice</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="customerName">Invoice Number</label>
          <input
            type="text"
            name="invoiceNo"
            placeholder="Enter Invoice Number"
            value={formData.invoiceNo}
            onChange={handleChange}
          />
          {errors.invoiceNo && (
            <p style={{ color: "red" }} className="Error_form">
              {errors.invoiceNo}
            </p>
          )}

          <div className="add">
            <div className="one">
              <label htmlFor="billNumber">Billed To</label>
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
              />
              {errors.customerName && (
                <p style={{ color: "red" }} className="Error_form">
                  {errors.customerName}
                </p>
              )}
            </div>
            <div className="one">
              <label htmlFor="customerEmail">Email</label>
              <input
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                value={formData.customerEmail}
                onChange={handleChange}
              />
              {errors.customerEmail && (
                <p style={{ color: "red" }} className="Error_form">
                  {errors.customerEmail}
                </p>
              )}
            </div>
          </div>

          <div className="date">
            <div className="one">
              <label htmlFor="customerAddress">Address</label>
              <input
                type="text"
                name="customerAddress"
                placeholder="Customer Address"
                value={formData.customerAddress}
                onChange={handleChange}
              />
              {errors.customerAddress && (
                <p style={{ color: "red" }} className="Error_form">
                  {errors.customerAddress}
                </p>
              )}
            </div>
            <div className="one">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                placeholder="Select Date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p style={{ color: "red" }} className="Error_form">
                  {errors.date}
                </p>
              )}
            </div>
          </div>

          <div className="div_service">
            <div>
              <h3 className="h3_service">Select Services:</h3>
              <div className="div_serve">
                <label>Video Editing</label>
                <input
                  className="in_serv"
                  type="checkbox"
                  checked={formData.services.videoEditing.selected}
                  onChange={(e) =>
                    handleServiceChange(
                      "videoEditing",
                      "selected",
                      e.target.checked
                    )
                  }
                />
              </div>

              {formData.services.videoEditing.selected && (
                <div className="two">
                  <label>Minutes:</label>
                  <input
                    type="number"
                    value={formData.services.videoEditing.minutes}
                    onChange={(e) =>
                      handleServiceChange(
                        "videoEditing",
                        "minutes",
                        e.target.value
                      )
                    }
                  />

                  <label>Quality: </label>
                  <select
                    value={formData.services.videoEditing.quality}
                    onChange={(e) =>
                      handleServiceChange(
                        "videoEditing",
                        "quality",
                        e.target.value
                      )
                    }
                  >
                    <option value="1080p">1080p</option>
                    <option value="2k">2k</option>
                    <option value="4k">4k</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <div className="div_serve">
                <label> Photo Editing</label>
                <input
                  type="checkbox"
                  checked={formData.services.photoEditing.selected}
                  onChange={(e) =>
                    handleServiceChange(
                      "photoEditing",
                      "selected",
                      e.target.checked
                    )
                  }
                />
              </div>

              {formData.services.photoEditing.selected && (
                <div className="two">
                  <label>Photos: </label>
                  <input
                    type="number"
                    value={formData.services.photoEditing.photos}
                    onChange={(e) =>
                      handleServiceChange(
                        "photoEditing",
                        "photos",
                        e.target.value
                      )
                    }
                  />

                  <label>
                    Quality:
                    <select
                      value={formData.services.photoEditing.quality}
                      onChange={(e) =>
                        handleServiceChange(
                          "photoEditing",
                          "quality",
                          e.target.value
                        )
                      }
                    >
                      <option value="1080p">1080p</option>
                      <option value="2k">2k</option>
                      <option value="4k">4k</option>
                    </select>
                  </label>
                </div>
              )}
            </div>

            <div>
              <div className="div_serve">
                <label>Graphic Designing</label>
                <input
                  type="checkbox"
                  checked={formData.services.graphicDesigning.selected}
                  onChange={(e) =>
                    handleServiceChange(
                      "graphicDesigning",
                      "selected",
                      e.target.checked
                    )
                  }
                />
              </div>

              {formData.services.graphicDesigning.selected && (
                <div className="">
                  <label>Type:</label>
                  <input
                    type="text"
                    value={formData.services.graphicDesigning.type}
                    onChange={(e) =>
                      handleServiceChange(
                        "graphicDesigning",
                        "type",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </div>
            <div className="div_serve">
              <label> Including GST (18%)</label>
              <input
                type="checkbox"
                checked={formData.services.gst.selected}
                onChange={(e) =>
                  handleServiceChange("gst", "selected", e.target.checked)
                }
              />
            </div>
          </div>

          <Button
            variant="contained"
            color="success"
            className="button_form"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
