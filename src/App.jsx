import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./Components/TodoList";
import TaskModal from "./Components/TaskModal";
import ConfirmationModal from "./Components/ConfirmationModal";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showStatusChangeModal, setShowStatusChangeModal] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "pending") return !task.isCompleted;
    return true;
  });

  const addTask = (newTask) => {
    axios.post("http://localhost:5000/todos", newTask).then((response) => {
      setTasks([...tasks, response.data]);
    });
    setShowAddModal(false);
  };

  const updateTask = (updatedTask) => {
    axios
      .put(`http://localhost:5000/todos/${updatedTask.id}`, updatedTask)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      });
    setEditTask(null);
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/todos/${taskId}`).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    });
    setShowDeleteModal(null);
  };

  const toggleComplete = (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    axios
      .put(`http://localhost:5000/todos/${task.id}`, updatedTask)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      });
    setShowStatusChangeModal(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TO-DO LIST</h1>
      <div className="header-controls">
        <button onClick={() => setFilter("all")} className="filter-button">
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="filter-button"
        >
          Completed
        </button>
        <button onClick={() => setFilter("pending")} className="filter-button">
          Pending
        </button>
        <button onClick={() => setShowAddModal(true)} className="add-task-btn">
          Add Task
        </button>
      </div>
      <TodoList
        tasks={filteredTasks}
        onEditTask={(task) => setEditTask(task)}
        onDeleteTask={(task) => setShowDeleteModal(task)}
        onToggleComplete={(task) => setShowStatusChangeModal(task)}
      />
      {showAddModal && (
        <TaskModal onClose={() => setShowAddModal(false)} onAdd={addTask} />
      )}
      {editTask && (
        <TaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onAdd={updateTask}
          isEdit
        />
      )}
      {showDeleteModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this task?"
          onConfirm={() => deleteTask(showDeleteModal.id)}
          onClose={() => setShowDeleteModal(null)}
        />
      )}
      {showStatusChangeModal && (
        <ConfirmationModal
          message={`Change status of this task to ${
            showStatusChangeModal.isCompleted ? "pending" : "completed"
          }?`}
          onConfirm={() => toggleComplete(showStatusChangeModal)}
          onClose={() => setShowStatusChangeModal(null)}
        />
      )}
    </div>
  );
};

export default App;
