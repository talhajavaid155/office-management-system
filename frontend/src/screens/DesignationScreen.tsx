import React from "react";
import AddDesignation from "../components/designation/AddDesignation";
import Header from "../components/Header";
import { DesignationProivder } from "../context/DesignationContext";

const DesignationScreen = () => {
  return (
    <div className="flex">
      <DesignationProivder>
        <Header />
        <AddDesignation />
      </DesignationProivder>
    </div>
  );
};

export default DesignationScreen;
