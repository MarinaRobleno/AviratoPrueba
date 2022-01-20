import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function NavBar({ setSearchId }) {
  const handleSearchId = (e) => {
    e.preventDefault();
    setSearchId(e.target.value);
  };
  return (
    <header>
      <input
        className="search-input"
        placeholder="Enter id"
        onChange={handleSearchId}
      ></input>
    </header>
  );
}
