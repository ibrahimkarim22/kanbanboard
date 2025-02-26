

const DroppableArea = ({ title, tasks, updateList, moveTask, deleteTask, isLight }) => {


  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', task); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const task = e.dataTransfer.getData('task'); 

    if (!tasks.includes(task)) { 
      moveTask(task, updateList); 
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={isLight ? 'droppable-container-dark' : 'droppable-container-light'}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div
          className='droppable-item'
          key={task}
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
        >
          {task}
          
          <button className='delete-button' onClick={() => deleteTask(task)}>X</button>
        </div>
      ))}

    </div>
  );
};

export default DroppableArea;
