const ConfirmationModal = ({ message, onConfirm, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Yes
          </button>
          <button onClick={onClose} className="cancel-btn">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
