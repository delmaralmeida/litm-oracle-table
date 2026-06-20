import { useEffect } from "react";
import "./ConfirmDeleteModal.css";

interface ConfirmDeleteModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({ name, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h2 className="modal-title" id="modal-title">Delete "{name}"?</h2>
        <p className="modal-body">
          This action cannot be undone. Are you sure you want to delete this item?
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
