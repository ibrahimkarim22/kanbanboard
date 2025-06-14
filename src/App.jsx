import './scss/app.scss';
import { useState, useEffect } from 'react';

import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import Signup from './components/Signup';
import Login from './components/Login';

import TaskInput from './components/TaskInput';
import DroppableArea from './components/DroppableArea';


function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(0, 238, 255)";
  }, [!user])

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || '');
          setTasks(data.tasks || []);
          setInProgressTasks(data.inProgressTasks || []);
          setCompletedTasks(data.completedTasks || []);
          setIsLight(data.isLight || false);
        }
      };
      fetchData();
    }
  }, [user])

  const saveUserData = async () => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        username,
        tasks,
        inProgressTasks,
        completedTasks,
        isLight
      });
    }
  };

  useEffect(() => {
    if (user) saveUserData();

  }, [tasks, inProgressTasks, completedTasks, isLight, username])

  const handleLogin = (user, newUsername = null) => {
    setUser(user);
    if (newUsername) setUsername(newUsername);
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUsername('');
      setTasks([]);
      setInProgressTasks([]);
      setCompletedTasks([]);
      setIsLight(false);

      document.body.style.backgroundColor = 'white';
      console.log('user logged out')
    } catch (error) {
      console.error('logout error', error.message);
    }
  }

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

  const moveToList = (task, targetList) => {
    if (targetList === 'To Do') {
      moveTask(task, setTasks);
    } else if (targetList === 'In Progress') {
      moveTask(task, setInProgressTasks);
    } else if (targetList === 'Completed') {
      moveTask(task, setCompletedTasks);
    }
  };

  const deleteTask = (task) => {
    setTasks((prev) => prev.filter((t) => t !== task));
    setInProgressTasks((prev) => prev.filter((t) => t !== task));
    setCompletedTasks((prev) => prev.filter((t) => t !== task));
  }

  const toggleTheme = () => {
    if (isLight) {
      document.body.style.backgroundColor = "rgb(0, 238, 255)";
    } else {
      document.body.style.backgroundColor = "rgb(121, 121, 121)";
    }
    setIsLight(!isLight);
  };

  return !user ? (
    <>
      <div className='authentication-container'>
        <p className='kanban-name'>Tuh-Doo</p>


        <Signup onLogin={handleLogin} />
        <div className='animation-container'>
          <i className='fa-solid fa-face-laugh-beam face'></i>
        </div>
        <Login onLogin={handleLogin} />
      </div>

      <div className='droppable-areas-container'>
        <TaskInput
          addToTasks={addToTasks}
          setIsLight={toggleTheme}
          isLight={isLight}
        />
        <div className='todo-droppable-area'>
          <DroppableArea
            title='To Do'
            tasks={tasks}
            updateList={setTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
        <div className='inprogress-droppable-area'>
          <DroppableArea
            title='In Progress'
            tasks={inProgressTasks}
            updateList={setInProgressTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
        <div className='completed-droppable-area'>
          <DroppableArea
            title='Completed'
            tasks={completedTasks}
            updateList={setCompletedTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
      </div>
      <footer className='footer'>
          <p className='footer-text'>&#169; 2025 Ibrahim Karim</p>
        <a href='https://ibrahimkarim-34158.web.app/' target='_blank' className='footer-text'>Portfolio</a>
        <a href='https://www.linkedin.com/in/ibrahim-karim-abaa952a7/' target='_blank' className='footer-text'>Linkedin</a>
      </footer>
    </>
  ) : (
    <>
      <div className='authentication-container'>
        <p className='kanban-name'>KANBAN BOARD</p>
        <div className='animation-container'>
          <i className='fa-solid fa-face-laugh-beam face'></i>
        </div>
        <div className='username-area'>
          <button onClick={handleLogout} className='logout-button'>Logout</button>
          <p className='username-name'>{username}</p>
        </div>
      </div>
      <div className='droppable-areas-container'>
        <TaskInput
          addToTasks={addToTasks}
          setIsLight={toggleTheme}
          isLight={isLight}
        />
        <div className='todo-droppable-area'>
          <DroppableArea
            title='To Do'
            tasks={tasks}
            updateList={setTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
        <div className='inprogress-droppable-area'>
          <DroppableArea
            title='In Progress'
            tasks={inProgressTasks}
            updateList={setInProgressTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
        <div className='completed-droppable-area'>
          <DroppableArea
            title='Completed'
            tasks={completedTasks}
            updateList={setCompletedTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            isLight={isLight}
            moveToList={moveToList}
          />
        </div>
      </div>
      <footer className='footer'>


        <p className='footer-text'>&#169; 2025 Ibrahim Karim</p>
        <a href='https://ibrahimkarim-34158.web.app/' target='_blank' className='footer-text'>Portfolio</a>
        <a href='https://www.linkedin.com/in/ibrahim-karim-abaa952a7/' target='_blank' className='footer-text'>Linkedin</a>
      </footer>
    </>
  )
}

export default App;