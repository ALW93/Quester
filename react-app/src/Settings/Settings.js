import React from "react";
import CategoryForm from "../Shared/CategoryForm";

const Settings = () => {
  return (
    <div style={{ textAlign: "-webkit-center", marginTop: "50px" }}>
      <h1 style={{ color: "white", textShadow: "0 0 10px rgb(137, 210, 191)" }}>
        Edit Categories
      </h1>
      <CategoryForm />
    </div>
  );
};

export default Settings;
