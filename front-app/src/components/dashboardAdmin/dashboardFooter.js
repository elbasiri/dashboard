import React from "react";


const DashboardFooter = ()=> {

     const currentYear = new Date().getFullYear();

     return (
          <div className="container">
        <p style={{width:"100%",textAlign:"center"}}>&copy; {currentYear} AllGoods. All rights reserved.</p>
      </div>
     );
}


export default DashboardFooter