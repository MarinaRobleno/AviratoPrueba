import React, { useState, useEffect } from "react";

export function NavBar({setSearchId}) {
  const handleSearchId = (e) => {
    e.preventDefault();
    setSearchId(e.target.value);
  };
  return (
    <header>
      <input className="search-input" placeholder="Enter id" onChange={handleSearchId}></input>
      <button className="add-users-button">Add Users</button>
    </header>
  );
}
