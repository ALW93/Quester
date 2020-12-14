import React from "react";
import { starIcon } from "../assets/icons";
import "./Text.css";

export const parseLevel = (exp) => {
  if (exp < 300) {
    return 1;
  } else if (exp < 900) {
    return 2;
  } else if (exp < 2700) {
    return 3;
  }
};

export const parseStatLevel = (points) => {
  if (points < 50) return "⭐";
  if (points < 120) return "⭐⭐";
  if (points < 250) return "⭐⭐⭐";
  if (points < 500) return "⭐⭐⭐⭐";
  if (points < 1000) return "⭐⭐⭐⭐⭐";
};

export const parseStarText = (num) => {
  if (num === 1) {
    return (
      <div className="one">
        <h2>Very Easy</h2>
      </div>
    );
  }
  if (num === 2) {
    return (
      <div className="two">
        <h2>Easy</h2>
      </div>
    );
  }
  if (num === 3) {
    return (
      <div style={{ display: "flex" }} className="three">
        <h2>Normal</h2>
      </div>
    );
  }
  if (num === 4) {
    return (
      <div className="four">
        <h2>Hard</h2>
      </div>
    );
  }
  if (num === 5) {
    return (
      <div style={{ justifyContent: "center" }} className="five">
        <h2>Very Hard</h2>
      </div>
    );
  }
};

export const parseDifficulty = (num) => {
  if (num === 1) {
    return (
      <>
        <div style={{ display: "flex" }}>{starIcon(50)}</div>
      </>
    );
  }
  if (num === 2) {
    return (
      <>
        <div style={{ display: "flex" }}>
          {starIcon(45)}
          {starIcon(45)}
        </div>
      </>
    );
  }
  if (num === 3) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          {starIcon(40)}
          {starIcon(40)}
          {starIcon(40)}
        </div>
      </div>
    );
  }
  if (num === 4) {
    return (
      <>
        <div style={{ display: "flex" }}>
          {starIcon(35)}
          {starIcon(35)}
          {starIcon(35)}
          {starIcon(35)}
        </div>
      </>
    );
  }
  if (num === 5) {
    return (
      <div style={{ justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          {starIcon(30)}
          {starIcon(30)}
          {starIcon(30)}
          {starIcon(30)}
          {starIcon(30)}
        </div>
      </div>
    );
  }
};

export const parseClass = (num) => {
  if (num === 1) return "veryeasy";
  if (num === 2) return "easy";
  if (num === 3) return "normal";
  if (num === 4) return "hard";
  if (num === 5) return "veryhard";
};
