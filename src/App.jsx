import './css/app.css';
import { useState } from 'react';

import TaskInput from './components/taskInput';
import DroppableArea from './components/droppableArea';


function App() {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLight, setIsLight] = useState(false);

  const addToTasks = (task) => {
    if (tasks.includes(task) || task.trim() === "") return;
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const moveTask = (task, updateList) => {
    setTasks((prev) => prev.filter((t) => t !== task));
    setInProgressTasks((prev) => prev.filter((t) => t !== task));
    setCompletedTasks((prev) => prev.filter((t) => t !== task));

    updateList((prev) => [...prev, task]);
  };

  const deleteTask = (task) => {
    setTasks((prev) => prev.filter((t) => t !== task));
    setInProgressTasks((prev) => prev.filter((t) => t !== task));
    setCompletedTasks((prev) => prev.filter((t) => t !== task));
  }

  const toggleTheme = () => {
    if (isLight) {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "black";
    }
    setIsLight(!isLight);
  };

  return (
    <>
      <div className='droppable-areas-container'>
      <TaskInput 
        addToTasks={addToTasks} 
        setIsLight={toggleTheme}
        isLight={isLight}
        />
        <DroppableArea
          title='To Do'
          tasks={tasks}
          updateList={setTasks}  
          moveTask={moveTask}
          deleteTask={deleteTask}
          isLight={isLight}
        />
        <DroppableArea
          title='In Progress'
          tasks={inProgressTasks}
          updateList={setInProgressTasks}  
          moveTask={moveTask}
          deleteTask={deleteTask}
          isLight={isLight}
        />
        <DroppableArea
          title='Completed'
          tasks={completedTasks}
          updateList={setCompletedTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          isLight={isLight}
        />
      </div>
    </>
  );
}

export default App;
