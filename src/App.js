import logo from './logo.svg';
import { UsersList } from './components/UsersList';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <UsersList data={data} setData={setData}/>
    </div>
  );
}

export default App;
