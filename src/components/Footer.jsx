import React from "react";
// let calculateAmount= (items) =>{
//   for (let key in items){
//     items[key].
//   }
// }
export default props => {
  return (
    <footer>
      <div className="summary-footer">{props.description}</div>
      <div className="total-bill">
        {"Total: $" + (props.totalBill ? props.totalBill : 0)}
      </div>
    </footer>
  );
};
