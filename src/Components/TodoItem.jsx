const TodoItem = ({ task, onEditTask, onDeleteTask, onToggleComplete }) => {
  return (
    <li className="task">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <small>{task.creator}</small>
      <div className="button-container">
        <button onClick={() => onToggleComplete(task)} className="complete-btn">
          {task.isCompleted ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEditTask(task)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDeleteTask(task)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
