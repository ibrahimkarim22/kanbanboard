import { useState, useEffect } from "react";

const TaskInput = ({ addToTasks }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim === '') return;
    addToTasks(task);
    setTask('');
  }

  return (
    <>
      <label>
        <input
          type="text"
          placeholder="TYPE TASK HERE..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </label>
      <button onClick={handleAddTask}>Add Task</button>
    </>
  );
};

export default TaskInput;
