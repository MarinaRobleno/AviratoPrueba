import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { EditForm } from "./EditForm";

export function UsersList({ users, setUsers, searchId }) {
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addData = async (name, username, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
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
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
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

  const editUser = async (id, name, username, email) => {
    console.log(id, name, username, email)
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
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
      setUsers(users.map((user) => user.id === id ? {...user, name: name, username: username, email: email} : user))
    })
    .catch((err) => {
      console.log(err);
    });
    
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    addData(e.target.name.value, e.target.username.value, e.target.email.value);
    const form = document.getElementById("new-user-form");
    form.reset();
  };

  const handleEditUser = (e) => {
    setEditingUser(e.id);
  };
  return (
    <div className="user-list-content">
      <form onSubmit={handleSubmitData} id="new-user-form">
        <div className="editing-title">Add a New User</div>
        <input placeholder="Name" name="name" />
        <input placeholder="username" name="username" />
        <input placeholder="email" name="email" />
        <button type="submit" onSubmit={handleSubmitData}>
          Add
        </button>
      </form>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Mail</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {users
          .filter((singleData) => {
            if (searchId == "") {
              return singleData;
            } else if (singleData.id == searchId) {
              return singleData;
            }
          })
          .map((singleData) => (
            <tr key={singleData.id}>
              <td>{singleData.id}</td>
              <td>{singleData.name}</td>
              <td>{singleData.username}</td>
              <td>{singleData.email}</td>
              <td>
                <AiFillEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditUser(singleData)}
                />
              </td>
              <td>
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteUser(singleData.id)}
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
