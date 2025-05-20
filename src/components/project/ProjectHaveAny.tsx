import React from "react";
import ButtonCreate from "../button/ButtonCreate";
import PlusIcon from "../icons/PlusIcon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { handleOpenAndClosePopupCreateboard } from "@/store/slices/boardSlice";

const ProjectHaveAny = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-full p-2 mx-auto flex flex-col items-center justify-center">
      <p>You do not have any projects yet!</p>
      <ButtonCreate
        className="w-[200px] my-2"
        styles="primary"
        onClick={() => dispatch(handleOpenAndClosePopupCreateboard(true))}
      >
        <PlusIcon />
        Create a project
      </ButtonCreate>
    </div>
  );
};

export default ProjectHaveAny;
