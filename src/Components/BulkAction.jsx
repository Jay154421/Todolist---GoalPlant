export const BulkAction = ({ onMarkAll, onDeleteAll, isMarked }) => {
  return (
    <div className="bulk-action-container">
      <button
        className={`bulk-action-button mark ${isMarked ? "unmark" : ""}`}
        onClick={onMarkAll}
      >
        {isMarked ? "Unmark All" : "Mark All"}
      </button>
      <button className="bulk-action-button delete" onClick={onDeleteAll}>
        Delete All
      </button>
    </div>
  );
};
