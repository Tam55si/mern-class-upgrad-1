
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState("");
  const [allUsers, setAllUsers] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name, phone, email
    }
    console.log(payload);

    axios.post("http://localhost:5000/setuser", payload)
      .then(res => {
        console.log("inside then", res.data.message);
        setResponse(res.data.message);
        setEmail("");
        setName("");
        setPhone("");
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    const getAllUsers = async () => {

      try {
        await axios.get("http://localhost:5000/getuser")
          .then(res => { console.log(res.data) })
          .then(res => setAllUsers(res.data))

      } catch (err) {
        console.log(err);
      }

    }
    getAllUsers();
  }, [])

  return (
    <div className="container">
      <h1>User's Directory</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter phone' />
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
        <button>Submit</button>
      </form>
      {response ? <h2>{response}</h2> : <h2>No Error</h2>}
      <div>
        <div>
          <h2>Users</h2>
          <button>Get all data</button>
          {allUsers.length && allUsers.map((user) => {
            return (


              <h2>{user.name}</h2>


            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
