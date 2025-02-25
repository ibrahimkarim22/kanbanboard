import './css/app.css'
import { useState } from 'react';

import TaskInput from './components/taskInput';
import DroppableArea from './components/droppableArea';


function App() {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addToTasks = (task) => {
    if (tasks.includes(task) || task.trim() === "") return;
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const moveTask = (task, fromListName, toListSetter) => {
    setTasks((prev) => prev.filter((t) => t !== task));
    setInProgressTasks((prev) => prev.filter((t) => t !== task));
    setCompletedTasks((prev) => prev.filter((t) => t !== task));

    toListSetter((prev) => [...prev, task]);
  };

  return (
    <>
      <TaskInput addToTasks={addToTasks} />
      <div className='droppable-areas-container'>
        <DroppableArea
          title='To Do'
          tasks={tasks}
          setTasks={setTasks}
          moveTask={moveTask}
          fromListName='tasks'
        />
        <DroppableArea
          title='In Progress'
          tasks={inProgressTasks}
          setTasks={setInProgressTasks}
          moveTask={moveTask}
          fromListName='inProgressTasks'
        />
        <DroppableArea
          title='Completed'
          tasks={completedTasks}
          setTasks={setCompletedTasks}
          moveTask={moveTask}
          fromListName='completedTasks'
        />
      </div>
    </>
  );
}

export default App;
