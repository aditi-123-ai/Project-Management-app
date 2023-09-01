import React, { useState, useEffect } from 'react';
import './App.css';

const initialTasks = [
  {
    id: 1,
    title: 'Task 1',
    assignee: 'Person A',
    status: 'Open',
    dueDate: '2023-10-15',
  },
  {
    id: 2,
    title: 'Task 2',
    assignee: 'Person B',
    status: 'InProgress',
    dueDate: '2023-10-20',
  },
  {
    id: 3,
    title: 'Task 3',
    assignee: 'Person C',
    status: 'Completed',
    dueDate: '2023-09-30',
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // 3 seconds
  };

  const handleAddTask = () => {
    if (newTask && assignee && dueDate) {
      if (editTaskId !== null) {
        // Editing an existing task
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                title: newTask,
                assignee,
                dueDate,
              }
            : task
        );
        setTasks(updatedTasks);
        setEditTaskId(null);
        showNotification('Task updated successfully');
      } else {
        // Adding a new task
        const newTaskObj = {
          id: tasks.length + 1,
          title: newTask,
          assignee,
          status: 'Open',
          dueDate,
        };

        setTasks([...tasks, newTaskObj]);
        showNotification('Task added successfully');
      }

      setNewTask('');
      setAssignee('');
      setDueDate('');
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTask(taskToEdit.title);
      setAssignee(taskToEdit.assignee);
      setDueDate(taskToEdit.dueDate);
      setEditTaskId(taskId);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    showNotification('Task deleted successfully');
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (notification) {
      // Scroll to the top to make the notification visible
      window.scrollTo(0, 0);
    }
  }, [notification]);

  return (
    <div className="app">
      <h1>Project Management App</h1>
      <div className="task-inputs">
        <label htmlFor="task">Task:</label>
        <input
          type="text"
          id="task"
          placeholder="Enter task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <label htmlFor="assignee">Assignee:</label>
        <input
          type="text"
          id="assignee"
          placeholder="Enter assignee name"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editTaskId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <div>
        <h2>Tasks</h2>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task ${task.status.toLowerCase()}`}>
              <div>
                <strong>{task.title}</strong> - Assigned to: {task.assignee} - Due Date: {task.dueDate}
              </div>
              <div>
                <span>Status:</span>
                <button onClick={() => handleStatusChange(task.id, 'Open')}>Open</button>
                <button onClick={() => handleStatusChange(task.id, 'InProgress')}>InProgress</button>
                <button onClick={() => handleStatusChange(task.id, 'Completed')}>Completed</button>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default App;
