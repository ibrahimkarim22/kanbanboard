const DroppableArea = ({ title, tasks, setTasks, moveTask, fromListName }) => {
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', task);
    e.dataTransfer.setData('fromList', fromListName);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTask = e.dataTransfer.getData('task');
    const fromList = e.dataTransfer.getData('fromList');

    if (!tasks.includes(droppedTask)) {
      moveTask(droppedTask, fromList, setTasks);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className='droppable-container'
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
        </div>
      ))}
    </div>
  );
};

export default DroppableArea;
