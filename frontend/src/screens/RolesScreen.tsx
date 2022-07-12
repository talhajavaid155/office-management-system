import React from "react";
import Header from "../components/Header";
import AllRoles from "../components/roles/AllRoles";

const RolesScreen = () => {
  return (
    <div className="flex">
      <Header />
      <AllRoles />
    </div>
  );
};

export default RolesScreen;
