import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./form.css";

export default function Form() {
  const location = useLocation();
  const { formDataB } = location.state || {};

  const [errors, setErrors] = useState({});
  const [serviceInputs, setServiceInputs] = useState([{ name: "", price: "" }]);
  const pdfRef = useRef();
  const navigate = useNavigate();

  const initialData = {
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    invoiceNo: "",
    date: "",
    total: "",
    subTotal: "",
    typeOfService: "",
    services: [{ name: "", price: "" }],
    gst: false,
    gstNo: ""
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (formDataB) {
      setFormData(formDataB);
      setServiceInputs(
        formDataB.services && formDataB.services.length > 0
          ? formDataB.services
          : [{ name: "", price: "" }]
      );
    }
  }, [formDataB]);

  const validateInvoice = async () => {
    try {
      let invoice = formData.invoiceNo;
      let data = await axios.post(
        "https://bill-generator-backend.onrender.com/invoiceCheck",
        {
          invoice,
        }
      );

      if (data.data === "Alright") {
        setFormData(initialData);
        navigate("/bill", { state: { formData: formData } });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          invoiceNo: "Invoice number already exists!",
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleServiceChange = (index, key, value) => {
    const updatedServices = [...serviceInputs];
    updatedServices[index][key] = value;
    setServiceInputs(updatedServices);
    setFormData({ ...formData, services: updatedServices });
  };

  const addService = () => {
    if (serviceInputs.length < 10) {
      setServiceInputs([...serviceInputs, { name: "", price: "" }]);
    }
  };

  const removeService = (index) => {
    const updatedServices = serviceInputs.filter((_, i) => i !== index);
    setServiceInputs(updatedServices);
    setFormData({ ...formData, services: updatedServices });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? { selected: checked } : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.customerName)
      newErrors.customerName = "Customer Name is required!";

    if (!formData.customerEmail)
      newErrors.customerEmail = "Customer Email is required!";
    if (!formData.invoiceNo)
      newErrors.invoiceNo = "Invoice Number is required!";
    if (!formData.date) newErrors.date = "Date is required!";
    if (!formData.typeOfService)
      newErrors.typeOfService = "Select Type of Service";

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
            <h3 className="h3_service">Services:</h3>
            <label htmlFor="" id="ser_form">
              Select Service Type
            </label>
            <select
              name="typeOfService"
              id=""
              className="select_form"
              value={formData.typeOfService}
              onChange={handleChange}
            >
              <option value="Advertisement Video">Advertisement Video</option>
              <option value="Presentation Video">Presentation Video</option>
              <option value="Reel & Short type">Reel & Short type</option>
              <option value="Documentry & Short film">
                Documentry & Short film
              </option>
              <option value="Color Correction">Color Correction</option>
              <option value="Tutorial Video">Tutorial Video</option>
              <option value="Youtube Video">Youtube Video</option>
              <option value="Vlog's">Vlog's</option>
            </select>
            {errors.typeOfService && (
              <p style={{ color: "red" }} className="Error_form">
                {errors.typeOfService}
              </p>
            )}

            <div className="add_service">
              <label htmlFor="add_service">Add Service</label>
              {serviceInputs.map((service, index) => (
                <div key={index} className="add_service_inputs">
                  <input
                    type="text"
                    placeholder="Enter Service Name"
                    value={service.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", e.target.value)
                    }
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="btn_rm_ser"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              ))}
              {serviceInputs.length < 10 && (
                <button
                  type="button"
                  onClick={addService}
                  className="btn_form_addService"
                >
                  Add Service
                </button>
              )}
            </div>

            <div className="gst">
              <label htmlFor="gst">Including (18%) GST </label>
              <input
                type="checkbox"
                name="gst"
                className="gst_form"
                onChange={(e) =>
                  handleChange({
                    target: { name: "gst", value: e.target.checked },
                  })
                 
                }
                 checked={formData.gst}
              /> </div>
              {formData.gst &&
                <div className="input_gstNo">
                  <input type="" name="gstNo" placeholder="Enter GSTIN Number" onChange={handleChange} value={formData.gstNo} />
                </div>}
           
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
