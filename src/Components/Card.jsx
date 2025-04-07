// src/components/Card.jsx
import "../css/App.css";
import { useTranslation } from "react-i18next";

export const Card = ({
  title,
  priority,
  subtitle,
  dueDate,
  category,
  onDelete,
  onEdit,
  id,
  isCompleted,
  onComplete,
  onMarkTask,
  isMarked, // New prop for conditional styling
}) => {
  const { t } = useTranslation();
  const isOverdue = new Date(dueDate) < new Date();

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (isConfirmed) {
      onDelete(id);
    }
  };

  const handleMark = () => {
    onMarkTask(id); // Mark/unmark the task when clicked
  };

  return (
    <div className={`card ${isMarked ? "marked" : ""}`} onClick={handleMark}>
      <div className="card-header">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onComplete(id, !isCompleted)}
        />
        <h3 className={`card-title ${isCompleted ? "completed" : ""}`}>
          {title}
        </h3>

        <span className={`priority-tag ${priority}`}> {t(priority)}</span>
        <span className={`category-tag ${category}`}>{t(category)}</span>

        <i className="edit-icon" onClick={() => onEdit(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#007bff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
            </g>
          </svg>
        </i>

        <i className="delete-icon" onClick={handleDelete}>
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#e31111"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
            ></path>
          </svg>
        </i>
      </div>

      <p className="card-subtitle">{subtitle}</p>

      {isOverdue ? (
        <p className="overdue">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5 1a.75.75 0 0 1 .75.75V3h5V1.75a.75.75 0 0 1 1.5 0V3H14a1 1 0 0 1 1 1v4.25a.75.75 0 0 1-1.5 0V7.5h-11v6h5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.25V1.75A.75.75 0 0 1 5 1M2.5 6h11V4.5h-11zm8.78 4.22a.75.75 0 1 0-1.06 1.06L11.94 13l-1.72 1.72a.75.75 0 1 0 1.06 1.06L13 14.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L14.06 13l1.72-1.72a.75.75 0 1 0-1.06-1.06L13 11.94z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          {t("overdue")}: {dueDate}
        </p>
      ) : (
        <p className="due-date">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#676e77"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16"></path>
              <path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path>
            </g>
          </svg>
          {t("due")}: {dueDate}
        </p>
      )}
    </div>
  );
};
