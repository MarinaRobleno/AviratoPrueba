import React, { useState, useEffect } from "react";
import axios from "axios";

export function UsersList({data, setData, searchId}) {


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
