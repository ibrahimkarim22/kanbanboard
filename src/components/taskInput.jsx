import { useState } from "react";

const TaskInput = ({ addToTasks, setIsLight, isLight }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim() === "") return;
    addToTasks(task);
    setTask("");
  };

  return (
    <>
    <div className='task-input-container'>
      <div >
        <input
        className='task-input'
          type='text'
          placeholder='TYPE TASK HERE...'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div >
        <button className='add-task-button' onClick={handleAddTask}>Add Task</button>
      </div>
      {isLight ? (
        
        <i onClick={() => setIsLight((prev) => !prev)} className="fa-solid fa-toggle-off toggle-button-dark" ></i>
      ) : (
        <i onClick={() => setIsLight((prev) => !prev)} className="fa-solid fa-toggle-on toggle-button"></i>
      )}
       
      
      </div>
    </>
  );
};

export default TaskInput;
