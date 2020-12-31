import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./Social.css";
import searchIcon from "../assets/search.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const SearchForm = ({ openSearch }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [start, setStart] = useState(false);
  const friends = useSelector((state) => state.user.friends);

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

      {results &&
        results.map((e) => {
          console.log(e);
          return (
            <li>
              {e.username}
              {JSON.stringify(friends).includes(JSON.stringify(e)) ? (
                <button>
                  <CheckCircleIcon style={{ fill: "green" }} /> Added{" "}
                </button>
              ) : (
                <button>
                  <PersonAddIcon />
                </button>
              )}
            </li>
          );
        })}
      {start && !results.length ? "No Matches Found." : null}

      <button onClick={() => openSearch(false)}>Cancel</button>
    </div>
  );
};

export default SearchForm;
