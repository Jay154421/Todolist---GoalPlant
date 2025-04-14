import { useTranslation } from "react-i18next";

export const BulkAction = ({ onMarkAll, onDeleteAll, isMarked }) => {
  const { t } = useTranslation();

  return (
    <div className="bulk-action-container">
      <button
        className={`bulk-action-button mark ${isMarked ? "unmark" : ""}`}
        onClick={onMarkAll}
      >
        {isMarked ? t("unmarkAll") : t("markAll")}
      </button>
      <button className="bulk-action-button delete" onClick={onDeleteAll}>
        {t("deleteAll")}
      </button>
    </div>
  );
};
