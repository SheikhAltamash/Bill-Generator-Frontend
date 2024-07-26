import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export const AlllBills = () => {
    let [bills, setBills] = React.useState([])
    let fetchData =async () => {
        let data = await axios.get(
          "https://bill-generator-backend.onrender.com/AllBills"
        );  
       setBills(data.data)
    }
    useEffect(() => {
        document.title = "All Bills"
        try {
            fetchData()
        } catch (e) {
            console.log(e.message)
        }


    }, []);

    let Navigate = useNavigate();

  return (
    <div className="main_all">
          <Link className="btn_back" to={"/"}>
            
        <ArrowBackIcon className="icon_form" />  Back
      </Link>
      <div className="bill_main">
        {bills.map((bill) => (
          <div key={bill._id} className="bill_all">
                <h2>Invoice: <span>{bill.invoiceNo}</span></h2>
            <p>Name: {bill.customerName}</p>

            <p>Date: {new Date(bill.date).toLocaleDateString()}</p>

          
            <button onClick={()=>Navigate("/Bill",{state:{check:bill}})}>Show Invoice</button>
         
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
