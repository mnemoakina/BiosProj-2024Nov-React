import "./TaskModal.css";

const TaskDetailModal = ({ task, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Task Details</h2>
        <div className="form-container">
          <p>
            <strong>Title:</strong> {task.name}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Creator:</strong> {task.creator}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {task.isCompleted ? "Completed" : "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
