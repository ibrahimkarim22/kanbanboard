import {useState} from 'react';


import DraggableBox from "./components/draggable";
import TaskInput from "./components/taskInput";




function App() {

  const [tasks, setTasks] = useState([]);

  const addToTasks = (task) => {
    if (tasks.includes(task) || task.trim === '') return;
    setTasks((prevTasks) => [...prevTasks, task]);
    console.log(tasks);
  };

  return (
    <>
    <TaskInput addToTasks={addToTasks}/>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <DraggableBox tasks={tasks}/>
      </div>
      <h1>hello</h1>
    </>
  );
}

export default App;
