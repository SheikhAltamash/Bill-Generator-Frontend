import React, { useState,useEffect } from 'react'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import pdf from "./assets/pdfimg.jpg";
import qr from "./assets/QR.jpg"
export const Description = ({ formData }) => {
    const [services, setServices] = useState(formData.services || []);
    const [totals, setTotals] = useState({ subTotal: 0, gst: 0, total: 0 });

   useEffect(() => {
     // Calculate the subTotal, GST, and total amounts
     const subTotal = services.reduce(
       (acc, service) => acc + (parseFloat(service.price) || 0),
       0
     );
     const gst = Math.floor(subTotal * 0.18)
     let total =Math.floor( subTotal + gst)
     if (!formData.gst) {
       total = Math.floor(subTotal);
     }
     setTotals({ subTotal, gst, total });
   }, [services]);
  return (
    <div className="n_BILL">
      <h3 className="h3_n_BILL">Services</h3>

      <div className="table_container_BILL">
        <table className="styled_table_BILL">
          <thead>
            <tr className="tr_table_BILL">
              <th>SR NO</th>
              <th>Name</th>
              <th>Quantity</th>

              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {formData.services.map((service, inx) => {
              return (
                <tr>
                  <td>{inx + 1}</td>
                  <td>{service.name}</td>
                  <td></td>
                  <td>
                    <span>{service.price}</span>
                    <span className="amount_bill_table">
                      <CurrencyRupeeIcon className="icon_table_rs"></CurrencyRupeeIcon>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="img_bill_bg">
        <img className="pdf-background" src={pdf} />
        <div className="total_bill_QR">
          <div className="total_BILL">
            {formData.gst && (
              <p>
                {" "}
                <p>
                  Sub-Total :{" "}
                  <span>
                    {totals.subTotal}
                    <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
                  </span>
                </p>
                <p>
                  GST(18%) :{" "}
                  <span>
                    {totals.gst}
                    <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
                  </span>
                </p>
              </p>
            )}

            <p>
              Total Price :{" "}
              <span>
                {totals.total}

                <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
              </span>
            </p>
          </div>
          <div className="img_qr">
            <img src={qr} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
11