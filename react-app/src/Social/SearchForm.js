import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "./Social.css";
import searchIcon from "../assets/search.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { setUpdate } from "../store/actions/utilityReducer";

const SearchForm = ({ openSearch }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [start, setStart] = useState(false);
  const friends = useSelector((state) => state.user.friends);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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

  const addUser = async (userId) => {
    const newRequest = {
      type: "request",
      message: "Let's be friends!",
      receiver_id: userId,
      sender_id: user.id,
    };
    const response = await fetch(`api/users/${user.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    });

    const data = await response.json();

    if (data.errors) {
      dispatch(setUpdate({ type: "Error", message: data.errors }));
    } else {
      openSearch(false);
      await dispatch(
        setUpdate({
          type: "Success",
          message: "Friend Request Sent!",
        })
      );
    }
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="message_form">
      <h1>User Lookup</h1>
      <div style={{ width: "70%", margin: "auto", marginBottom: "10px" }}>
        <TextField
          value={query}
          onChange={updateQuery}
          type="text"
          fullWidth={true}
          placeholder={query}
          variant="filled"
          InputProps={{
            startAdornment: <img src={searchIcon} style={{ width: "35px" }} />,
          }}
        />
      </div>
      <button onClick={searchUsers}>Search</button>
      {"  "}
      <button onClick={() => openSearch(false)}>Cancel</button>

      <div style={{ margin: "20px" }} className="grid__container">
        {results &&
          results.map((e) => {
            return (
              <div>
                <h2>{e.username}</h2>
                {"  "}
                {JSON.stringify(friends).includes(JSON.stringify(e)) ? (
                  <button>
                    <CheckCircleIcon style={{ fill: "green" }} />
                    Friends{" "}
                  </button>
                ) : (
                  <button onClick={() => addUser(e.id)}>
                    <PersonAddIcon /> Add Friend
                  </button>
                )}
              </div>
            );
          })}
      </div>
      {start && !results.length ? "No Matches Found." : null}
    </div>
  );
};

export default SearchForm;
