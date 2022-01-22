import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { EditForm } from "./EditForm";

export function UsersList({ users, setUsers, searchId }) {
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://examen.avirato.com/client/get")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addData = async (nombre, telefono, correo, fechaNacimiento) => {
    await fetch("https://examen.avirato.com/client/post", {
      method: "POST",
      body: JSON.stringify({
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status != 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteUser = async (id) => {
    await fetch(`https://examen.avirato.com/client/delete/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status !== 200) {
        return;
      } else {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        );
      }
    });
  };

  const editUser = async (id, nombre, telefono, correo, fechaNacimiento) => {
    console.log(id, nombre, telefono, correo, fechaNacimiento);
    await fetch(`https://examen.avirato.com/client/put/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento
      }),
    })
      .then((res) => {
        if (res.status != 200) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(
          users.map((user) =>
            user.id === id
              ? { ...user, nombre: nombre, telefono: telefono, correo: correo, fechaNacimiento: fechaNacimiento }
              : user
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    addData(e.target.nombre.value, e.target.telefono.value, e.target.correo.value, e.target.fechaNacimiento.value);
    const form = document.getElementById("new-user-form");
    form.reset();
  };

  const handleEditUser = (e) => {
    setEditingUser(e.id);
  };
  return (
    <div className="user-list-content">
      <div className="add-container">
        <div className="editing-title">Add a New User</div>
        <form onSubmit={handleSubmitData} className="editing-form" id="new-user-form">
          <input className="styled-input" placeholder="Nombre" nombre="nombre" />
          <input
            className="styled-input"
            placeholder="Telefono"
            nombre="telefono"
          />
          <input className="styled-input" placeholder="Correo" nombre="correo" />
          <input className="styled-input" placeholder="Fecha de Nacimiento" nombre="fechaNacimiento" />
          <button className="styled-button" type="submit" onSubmit={handleSubmitData}>
            Add
          </button>
        </form>
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Birthday</th>
          <th>Mail</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {users
          .filter((user) => {
            if (searchId == "") {
              return user;
            } else if (user.id == searchId) {
              return user;
            }
          })
          .map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.telefono}</td>
              <td>{user.fechaNacimiento}</td>
              <td>{user.correo}</td>
              <td>
                <AiFillEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditUser(user)}
                />
              </td>
              <td>
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
      </table>
      {editingUser ? (
        <EditForm
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          editUser={editUser}
        />
      ) : null}
    </div>
  );
}
