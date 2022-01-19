import React, { useState, useEffect } from "react";
import axios from "axios";

export function UsersList({data, setData}) {
    const [searchId, setSearchId] = useState("")

const handleSearchId = (e) =>{
    e.preventDefault();
    setSearchId(e.target.value)
}
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
        <input placeholder="Enter id" onChange={handleSearchId}></input>
      <ul>
        {data
        .filter((singleData) => {
            if(searchId == ""){
                return singleData;
            }
            else if(singleData.id == searchId){
                return singleData;
            }
        })
        .map((singleData) => (
          <li key={singleData.id}>Id: {singleData.id} - Name: {singleData.name}</li>
        ))}
      </ul>
    </div>
  );
}
