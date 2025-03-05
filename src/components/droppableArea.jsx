const DroppableArea = ({ title, tasks, updateList, moveTask, deleteTask, isLight, moveToList }) => {

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

  const nextList = (currentTitle) => {
    if (currentTitle === 'To Do') return 'In Progress';
    if (currentTitle === 'In Progress') return 'Completed';
    return null;
  }

  const previousList = (currentTitle) => {
    if (currentTitle === 'Completed') return 'In Progress';
    if (currentTitle === 'In Progress') return 'To Do';
    return null;
  }

  return (
    <div
      className={isLight ? 'dark' : 'light'}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className='the-title'>{title}</h2>
      {tasks.map((task) => (
        <div
          className='droppable-item'
          key={task}
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
        >
          {previousList(title) && (
            <button
              className='move-previous'
              onClick={() => moveToList(task, previousList(title))}></button>
          )}
          <div className='item-name'>
            {task}
          </div>
          {nextList(title) && (
            <button
              className='move-next'
              onClick={() => moveToList(task, nextList(title))}
            ></button>
          )}

          <button className='delete-button' onClick={() => deleteTask(task)}>X</button>
        </div>
      ))}

    </div>
  );
};

export default DroppableArea;
