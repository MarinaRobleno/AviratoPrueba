import { UsersList } from "./components/UsersList";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
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
                users={users}
                setUsers={setUsers}
                searchId={searchId}
                submitData={submitData}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
