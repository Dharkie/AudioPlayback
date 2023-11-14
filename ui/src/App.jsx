import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const[message, setMesage]= useState('');
  const [count, setCount] = useState(0)

  useEffect(()=>{
    axios.get('/api')/*returns a promise => synonymous to try () and catch() method*/
    .then((response)=> {
      console.log({response})
    })
    .catch()
    .finally()
  }, [])// tell vite creates a proxy(middle man), that proxy that call and sends to the server
  return (
    <>
      
    </>
  )
}

export default App

/*axios.get('/api')
.then(()=> {
  console.log({response})
})//run if we get a success on api call
.catch()//if we get an error
.finally(); //runs regardless
*/