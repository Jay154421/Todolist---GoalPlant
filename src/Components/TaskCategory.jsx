import React from "react";

export function TaskCategory(props) {
  return (
    <div>
      <h1>{props.taskTitle}</h1>
      <input type="text" placeholder="+ add task" />
      <button>add</button>
    </div>
  );
}
