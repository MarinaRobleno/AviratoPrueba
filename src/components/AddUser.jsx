import React, { useState } from "react";

export function AddUser({setSubmitData, users}) {
  const [addedData, setAddedData] = useState({});

  const handleSubmitData = (e) => {
    e.preventDefault();
    setAddedData({...addedData, id: users.length})
    setSubmitData(addedData);
    const form = document.getElementById("new-user-form");
    form.reset();
  }
  
  return (
    <>
    <div>Add New User</div>
    <form onSubmit={handleSubmitData} id="new-user-form">
      <input placeholder="Name" onChange={(e) => setAddedData({...addedData, name: e.target.value})}/>
      <input placeholder="username" onChange={(e) => setAddedData({...addedData, username: e.target.value})}/>
      <input placeholder="email" onChange={(e) => setAddedData({...addedData, email: e.target.value})}/>
      <button type="submit" onSubmit={handleSubmitData}>Submit</button>
    </form>
    </>
  );
}
