import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export function EditForm({ editingUser, setEditingUser, editUser }) {
  const handleSubmitEdition = (e) => {
    e.preventDefault();
    editUser(
      editingUser,
      e.target.name.value,
      e.target.username.value,
      e.target.email.value
    );
    setEditingUser(null);
  };

  const handleClose = () => {
      setEditingUser(null);
  }

  return (
    <div className="editing-container">
      <div className="editing-header">
        <div className="editing-title">Edit User {editingUser}</div>
        <AiFillCloseCircle className="close-icon" onClick={handleClose}/>
      </div>
      <form className="editing-form" onSubmit={handleSubmitEdition}>
        <input className="styled-input" placeholder="Name" name="name" />
        <input
          className="styled-input"
          placeholder="username"
          name="username"
        />
        <input className="styled-input" placeholder="email" name="email" />
        <button
          className="styled-button"
          id="edit-button"
          onSubmit={handleSubmitEdition}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
