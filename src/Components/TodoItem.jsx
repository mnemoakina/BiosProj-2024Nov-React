const TodoItem = ({ task, onEditTask, onDeleteTask, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.isCompleted ? "completed" : "pending"}`}>
      <h3 className="task-title">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <span className="task-creator">Created by: {task.creator}</span>
      <div className="task-status-icon">{task.isCompleted ? "✔️" : "⏳"}</div>
      <div className="button-container">
        <button onClick={() => onToggleComplete(task)}>
          {task.isCompleted ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEditTask(task)}>Edit</button>
        <button onClick={() => onDeleteTask(task)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
