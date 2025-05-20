"use client";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import Button from "@/components/button/Button";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import InputEditText from "@/components/input/InputEditText";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { useLayoutStates } from "@/contexts/layoutStates";
import { setBoards, setSingleBoard } from "@/store/slices/boardSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Tooltip } from "@nextui-org/tooltip";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const BoardMenu = () => {
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const { singleBoard, boards } = useSelector(
    (state: RootState) => state.board
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateBoardTitle = (id: Id, title: string) => {
    // updated current page data
    if (id === singleBoard.id) {
      dispatch(
        setSingleBoard({
          id: singleBoard.id,
          title: title,
          img: singleBoard.img,
        })
      );
    }
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    dispatch(setBoards(newLists));
  };
  return (
    <div className="flex items-center justify-between h-[8%] w-auto bg-black bg-opacity-20 p-2 backdrop-blur-sm">
      <InputEditText
        id={singleBoard.id}
        title={singleBoard.title}
        updateTitle={handleUpdateBoardTitle}
        pClass="w-auto hover:bg-white hover:bg-opacity-25"
      ></InputEditText>
      {!showMenuboard && (
        <Tooltip
          showArrow
          content="Open board settings"
          placement="bottom-end"
          radius="sm"
          delay={200}
          closeDelay={200}
          className="!px-2 !py-[2px]"
          shadow="sm"
        >
          <div>
            <Button
              className="w-8 h-8 hover:bg-opacity-20 !rounded !p-0"
              onClick={handleShowMenuboard}
            >
              <ThreeDotsIcon fontSize="medium" />
            </Button>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default BoardMenu;
