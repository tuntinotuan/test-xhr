import { projectList } from "@/api/board/mock.data";
import React from "react";
import ProjectCardListItem from "./ProjectCardListItem";
import ProjectHaveAny from "./ProjectHaveAny";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ProjectCardList = () => {
  const { boards } = useSelector((state: RootState) => state.board);
  return (
    <>
      {boards.length > 0 ? (
        <div className="card-list grid grid-flow-row mb-5">
          <div className="grid grid-cols-[50%_50%] gap-4 text-sm border border-transparent border-b-gray-200 p-4">
            <p>Name</p>
            <p>Edited</p>
          </div>
          {boards.map((item) => (
            <ProjectCardListItem
              title={item.title}
              img={item.img}
              key={item.id}
              id={item.id}
            ></ProjectCardListItem>
          ))}
        </div>
      ) : (
        <ProjectHaveAny />
      )}
      <h1 className="text-2xl font-semibold">Example designs</h1>
      <div className="card-list grid grid-flow-row">
        <div className="grid grid-cols-[50%_50%] gap-4 text-sm border border-transparent border-b-gray-200 p-4">
          <p>Name</p>
          <p>Edited</p>
        </div>
        {projectList.map((item, index) => (
          <ProjectCardListItem
            title={item.title}
            img={item.img}
            key={index}
          ></ProjectCardListItem>
        ))}
      </div>
    </>
  );
};

export default ProjectCardList;
