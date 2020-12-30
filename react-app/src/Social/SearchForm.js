import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import "./Social.css";
import searchIcon from "../assets/search.svg";

const SearchForm = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const searchUsers = () => {
    //
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="message_form">
      <h1>User Lookup</h1>
      <img src={searchIcon} style={{ width: "35px" }} />
      <TextField value={query} onChange={updateQuery} type="text" />
      <button onClick={searchUsers}>Search</button>
      {JSON.stringify(results)}
    </div>
  );
};

export default SearchForm;
