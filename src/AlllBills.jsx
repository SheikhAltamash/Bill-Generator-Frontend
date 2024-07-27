import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export const AlllBills = () => {
  let [bills, setBills] = React.useState([]);
   let [loading, setLoading] = React.useState(true);
 
 
  useEffect(() => {
    document.title = "All Bills";

    const fetchData = async (retries = 3) => {
      try {
        const response = await axios.get(
          "https://bill-generator-backend.onrender.com/AllBills"
        );
        setBills(response.data);
      } catch (error) {
        if (retries > 0) {
          console.warn(`Retrying fetch, attempts left: ${retries}`);
          fetchData(retries - 1);
        } else {
          console.error("Error fetching data:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


    let Navigate = useNavigate();

  return (
    <div className="main_all">
      <Link className="btn_back" to={"/"}>
        <ArrowBackIcon className="icon_form" /> Back
      </Link>
      <div className="bill_main">
        {loading ? (
          <p className='loading_p'>Loading...</p>
        ) : (
          bills.map((bill) => (
            <div key={bill._id} className="bill_all">
              <h2>
                Invoice: <span>{bill.invoiceNo}</span>
              </h2>
              <p>Name: {bill.customerName}</p>
              <p>Date: {new Date(bill.date).toLocaleDateString()}</p>
              <button
                onClick={() => Navigate("/Bill", { state: { check: bill } })}
              >
                Show Invoice
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
