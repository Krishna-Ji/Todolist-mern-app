import { useEffect, useState } from 'react'
import axios from 'axios'
// import './App.css'
// import Card from './components/Card'

function App() {
  const [count, setCount] = useState([])
  const [newTask, setnewTask] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000')
      .then((response) => response.json())
      .then((data) => setCount(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  function handleChange(e) {
   setnewTask(e.target.value)
  }

  const AddTask = async () => {
    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCount([...count, data]);
        setnewTask('');
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = count.filter((_, i) => i !== index);
    setCount(updatedTasks);
  };

  return (
    <>
      
      <div className=' shadow-md w-full max-w-[480px] bg-white p-5 mt-[100px] ml-auto mr-auto rounded-[10px]'>
      <form>
        <h1 className=' mb-8 text-[32px] font-bold-200 text-center '>Todo List App</h1>
        <div className='flex justify-between relative '>
            <input id='ipt' onChange={(e) => setnewTask(e.target.value)} className=' text-xl pl-3 pr-[80px] h-[45px] border-none outline-none bg-gray-400 rounded-[20px]' type="text" placeholder='Please Add Your Task' />
        <button onClick={AddTask} type='submit' className=' transition delay-75 duration-500 hover:bg-green-700  w-[140px] absolute ml-[240px] text-white bg-rose-500 text-[20px] h-45px p-2 rounded-[20px]' >Add Task</button>
        </div>
        </form>
        <ul id='list' > 
        {count.map((task, index) => (
    <li key={index} className='text-black ml-4 mt-[40px] mb-3 text-lg flex justify-between items-center'>
      {task.text} {/* Access the 'text' property */}
      <button className='transition duration-200 hover:bg-slate-300 w-[100px] pr-5 pl-5 pt-1 pb-1 bg-slate-400 text-lg border-none outline-none' onClick={() => handleRemoveTask(index)}>Remove</button>
    </li>
  ))}
</ul>


    </div>
    </>
  )
}



export default App
