import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export function EditForm({ editingUser, setEditingUser, editUser }) {
  const handleSubmitEdition = (e) => {
    e.preventDefault();
    editUser(
      editingUser,
      e.target.nombre.value,
      e.target.telefono.value,
      e.target.correo.value,
      e.target.fechaNacimiento.value
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
        <input className="styled-input" placeholder="Nombre" name="nombre" />
        <input
          className="styled-input"
          placeholder="Teléfono"
          name="telefono"
        />
        <input className="styled-input" placeholder="Correo" name="correo" />
        <input className="styled-input" placeholder="Fecha de Nacimiento" name="fechaNacimiento" />
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
