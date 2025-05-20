import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import InputEditText from "@/components/input/InputEditText";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Id } from "./types";

const CardItem = ({
  task,
  className,
  updateTask,
  handleDeleteTask,
  updateTaskChecked,
}: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 group p-2 rounded-lg cursor-grab ${className} ${
        isDragging
          ? "blur-[0.5px] bg-opacity-75 border-2 border-secondaryColor"
          : ""
      } ${task.checked ? "bg-green-100" : "bg-gray-100"}`}
    >
      <InputEditText
        id={task.id}
        title={task.content}
        updateTitle={updateTask}
        pClass="w-full h-auto"
        inputClass="w-full"
      ></InputEditText>
      <input
        type="checkbox"
        checked={task.checked}
        onChange={(e) => updateTaskChecked(task.id, e.target.checked)}
        className="w-5 h-5 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      />
      <DeleteIcon
        className="transition-all opacity-0 group-hover:opacity-100"
        onClick={() => handleDeleteTask(task.id)}
      />
    </div>
  );
};

export default CardItem;
