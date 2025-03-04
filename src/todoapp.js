import React, { useState } from 'react';
 
const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
 
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };
 
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
 
  return (
<div>
<h2>Todo List</h2>
<input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
<button onClick={handleAddTask}>Add Task</button>
 
      <ul>
        {tasks.map((task, index) => (
<li key={index}>
            {task} <button onClick={() => handleDeleteTask(index)}>Delete</button>
</li>
        ))}
</ul>
</div>
  );
};
 
export default TodoApp;