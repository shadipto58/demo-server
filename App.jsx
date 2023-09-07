
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          alert('user add successfull')
        }
        // const newUser = [...users, data];
        // setUsers(newUser)
        form.reset();
      })

  }


  return (
    <div>
      <h2 className='text-xl text-yellow-300'>This Is a Fresh APP With Tailwind and daisy UI</h2>

      <div>
        <h2 className='text-6xl'>Our User is {users.length}</h2>
        {
          users?.map(user => <h2 key={user._id} className='text-4xl'>{user.name}</h2>)
        }
      </div>
      <form className='m-10' onSubmit={handleUser}>
        <br />
        <input type="text" name='name' placeholder='Enter your name' />
        <br /><br />
        <input type="text" name='email' placeholder='Enter your email' />
        <br /><br />
        <input className='rounded-full bg-amber-500' type="submit" value='Submit' />
      </form>
    </div>
  )
}

export default App
