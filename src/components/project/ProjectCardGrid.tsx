import { projectList } from "@/api/board/mock.data";
import React from "react";
import ProjectCardGridItem from "./ProjectCardGridItem";
import ProjectHaveAny from "./ProjectHaveAny";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProjectCardGrid = () => {
  const { boards } = useSelector((state: RootState) => state.board);
  return (
    <>
      {/* {loadingFetchBoards && (
        <div className="card-grid grid grid-cols-4 w-full gap-6 mb-5">
          {Array(4)
            .fill(null)
            .map((item, index) => (
              <div
                key={index}
                className="w-[220px] h-[222px] bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
        </div>
      )} */}
      {boards.length > 0 && (
        <div className="card-grid flex flex-wrap justify-start w-full gap-6 mb-5">
          {boards.map((item) => (
            <ProjectCardGridItem
              title={item.title}
              img={item.img}
              key={item.id}
              id={item.id}
            ></ProjectCardGridItem>
          ))}
        </div>
      )}
      {boards.length <= 0 && <ProjectHaveAny />}
      <h1 className="text-2xl font-semibold">Example designs</h1>
      <div className="card-grid flex flex-wrap justify-start gap-6">
        {projectList.map((item, index) => (
          <ProjectCardGridItem
            title={item.title}
            img={item.img}
            key={index}
          ></ProjectCardGridItem>
        ))}
      </div>
    </>
  );
};

export default ProjectCardGrid;
