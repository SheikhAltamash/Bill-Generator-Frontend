import React from 'react'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
export const Description = ({formData}) => {
  return (
    <div className="n_BILL">
      <h3 className="h3_n_BILL">Service</h3>

      <div className="table_container_BILL">
        <table className="styled_table_BILL">
          <thead>
            <tr className="tr_table_BILL">
              <th>TYPE</th>
              <th>QUALITY</th>
              <th>QUANTITY</th>
              <th>MINUTE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {formData.services.graphicDesigning.selected && (
              <tr>
                <td>Graphic Designing</td>
                <td>-</td>
                <td>{formData.services.graphicDesigning.type}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
            {formData.services.photoEditing.selected && (
              <tr>
                <td>Photo Editing</td>
                <td>{formData.services.photoEditing.quality}</td>
                <td>{formData.services.photoEditing.photos}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
            {formData.services.videoEditing.selected && (
              <tr>
                <td>Video Editing</td>
                <td>{formData.services.videoEditing.quality}</td>
                <td>-</td>
                <td>{formData.services.videoEditing.minutes}</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="total_BILL">
        <p>
          Sub-Total :{" "}
          <span>
            60{" "}
            <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
          </span>
        </p>
        <p>
          GST(18%) :{" "}
          <span>
            150{" "}
            <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
          </span>
        </p>
        <p>
          Total Price :{" "}
          <span>
            {" "}
            200
            <CurrencyRupeeIcon className="icon_serv_BILL"></CurrencyRupeeIcon>
          </span>
        </p>
      </div>
    </div>
  );
}
11