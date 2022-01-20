import React, { useState } from "react";

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
  return (
    <div className="editing-container">
      <div className="editing-title">Edit User {editingUser}</div>
      <form className="editing-form" onSubmit={handleSubmitEdition}>
        <input placeholder="Name" name="name" />
        <input placeholder="username" name="username" />
        <input placeholder="email" name="email" />
        <button className="submit-edit" onSubmit={handleSubmitEdition}>
          Submit
        </button>
      </form>
    </div>
  );
}
