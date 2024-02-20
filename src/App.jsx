import { useState } from 'react'
import Home from './Components/Home';
import {Login} from './Components/Login';
import './App.css';

import firebaseApp from './Firebase/Firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp);


function App() {

  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (userFirebase)=>{
    if(userFirebase){
      setUser(userFirebase);
    }else{
      setUser(null);
    }
  })

  return (
    <div>
      <h2  style={{textAlign:'center', margin:'5vh 0px'}}>CRUD React & Firebase</h2>
      {user ? <Home emailUser={user.email}/> : <Login/>}
    </div>
  )
}

export default App
