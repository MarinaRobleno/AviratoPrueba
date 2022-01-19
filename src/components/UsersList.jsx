import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Link } from "react-router-dom";

export function UsersList({ data, setData, searchId, submitData }) {
  const [editingUser, setEditingUser] = useState({});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  useEffect(() => {
    if (submitData) {
      axios
        .post("https://jsonplaceholder.typicode.com/users", {
          submitData,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [submitData]);

  const handleDeleteUser = (e) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users", {
        data: {id: e}
      });
  }

  const handleEditUser = (e) => {
    e.preventDefault();
    setEditingUser(e)
  }
  return (
    <div className="user-list-content">
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Mail</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data
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
              <td><AiFillEdit style={{cursor: 'pointer'}} onClick={() => handleEditUser(singleData)}/></td>
              <td><AiFillDelete style={{cursor: 'pointer'}} onClick={() => handleDeleteUser(singleData)}/></td>
            </tr>
          ))}
      </table>
    </div>
  );
}
