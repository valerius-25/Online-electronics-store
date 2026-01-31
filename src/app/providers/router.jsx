import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Arduino from "../../pages/Arduino";
import Accumulators from "../../pages/Accumulators";
import Power from "../../pages/power";
import SensorsModules from "../../pages/sensorsModules";
import Connectivity from "../../pages/Connectivity";
import Accessories from "../../pages/Accessories";
import Kits from "../../pages/kits";
import Slider from "../../shared/Slider";
import ArduinoDetails from "../../shared/ArduinoDetails";
import AccumulatorDetails from "../../shared/AccumulatorDetails";
import PowerDetails from "../../shared/PowerDetails"
import SensorsModulesDetails from "../../shared/SensorsModulesDetails";
import ConnectivityDetails from "../../shared/ConnectivityDetails";
import Buy from "../../shared/buy";
import Cart from "../../shared/Cart";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arduino" element={<Arduino />} />
        <Route path="/accumulators" element={<Accumulators />} />
        <Route path="/power" element={<Power />} />
        <Route path="/sensorsModules" element={<SensorsModules />} />
        <Route path="/connectivity" element={<Connectivity />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/kits" element={<Kits />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/arduino/:id" element={<ArduinoDetails />} />
        <Route path="/accumulator/:id" element={<AccumulatorDetails />} />
        <Route path="/power/:id" element={<PowerDetails />} />
        <Route path="/sensorsModules/:id" element={<SensorsModulesDetails/>}/>
        <Route path="/connectivityDetails/:id" element={< ConnectivityDetails/>}/>
        <Route path="/Buy" element={<Buy /> }/>
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default MainRouter;
