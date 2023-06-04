import React from "react";
import CostumerChart from "./HomeComponents/costumerChart";
import SalesChart from "./HomeComponents/salesChart";


const Home = ()=> {

     return (
          <div className="container">
      <div className="">
        <div className="mb-4">
          <CostumerChart />
        </div>
        <div>
          <SalesChart />
        </div>
      </div>
    </div>

     );
}


export default Home