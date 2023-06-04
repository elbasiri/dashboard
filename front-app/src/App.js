import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/dashboardAdmin/css/App.css';

import PartnerList from './components/dashboardAdmin/partnerList';
import CostumerList from './components/dashboardAdmin/costumerList';
import ProductPList from './components/dashboardAdmin/productPList';
import Commands from './components/dashboardAdmin/Commands';
import Sidebar from './components/dashboardAdmin/sidebar';
import DashboardFooter from './components/dashboardAdmin/dashboardFooter';
import DashboardHeader from './components/dashboardAdmin/dashboardHeader';
import Home from './components/dashboardAdmin/Home';

const App = () => {


  return (
    <Router>
      <div className="d-flex flex-column" style={{backgroundColor: "#444"}}>
        <DashboardHeader />

        <div className="d-flex">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="container-fluid">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<ProductPList />} />
                <Route path="/customers" element={<CostumerList />} />
                <Route path="/partners" element={<PartnerList />} />
                <Route path="/commands" element={<Commands />} />
              </Routes>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </Router>
  );
};

export default App;
