import { UsersList } from './components/UsersList';
import { useState } from 'react';
import { NavBar } from './components/NavBar';

function App() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState("")
  return (
    <div className="App">
      <NavBar setSearchId={setSearchId}/>
      <UsersList data={data} setData={setData} searchId={searchId}/>
    </div>
  );
}

export default App;
