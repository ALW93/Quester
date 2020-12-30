import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import "./Social.css";
import searchIcon from "../assets/search.svg";

const SearchForm = ({ openSearch }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [start, setStart] = useState(false);

  const searchUsers = async () => {
    const response = await fetch(`/api/data/find_users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    setResults(data.results);
    setStart(true);
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
      <ul>
        {results &&
          results.map((e) => {
            return <li>{e.username}</li>;
          })}
        {start && !results.length ? "No Matches Found." : null}
      </ul>
      <button onClick={() => openSearch(false)}>Cancel</button>
    </div>
  );
};

export default SearchForm;
