import { UsersList } from "./components/UsersList";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { AddUser } from "./components/AddUser";

function App() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [submitData, setSubmitData] = useState({});
  return (
    <div className="App">
      <NavBar setSearchId={setSearchId} />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <UsersList
                data={data}
                setData={setData}
                searchId={searchId}
                submitData={submitData}
              />
            }
          />
          <Route
            path="/new-user"
            element={<AddUser setSubmitData={setSubmitData} data={data} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
