"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import AddBtn from "./modules/AddBtn";
import AddBox from "./modules/AddBox";
import ListContainer from "./modules/ListContainer";
import List from "./modules/List";
import { ListType, Id, Task } from "./modules/types";
import { createPortal } from "react-dom";
import CardItem from "./modules/CardItem";
import { initialLists, initialTasks, projectList } from "@/api/board/mock.data";
import { cutIdFromSlug, generateId, replaceAllTrim } from "@/utils/otherFs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSingleBoard } from "@/store/slices/boardSlice";

export default function Page({ params }: any) {
  const { singleBoard, boards } = useSelector(
    (state: RootState) => state.board
  );
  const dispatch = useDispatch<AppDispatch>();

  const newBoard = boards.find(
    (item) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
  );
  const exampleBoard = projectList.find(
    (item) => replaceAllTrim(item.title) === params.slug
  );
  useEffect(() => {
    if (newBoard) {
      dispatch(setSingleBoard(newBoard));
    } else {
      exampleBoard && dispatch(setSingleBoard(exampleBoard));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBoard, exampleBoard]);

  return (
    <div className="flex w-full overflow-hidden">
      <LocalBody params={params}></LocalBody>
      <BoardSidebar />
    </div>
  );
}

function LocalBody({ params }: any) {
  const { singleBoard } = useSelector((state: RootState) => state.board);
  return (
    <div
      className={`overflow-hidden w-full h-full text-white bg-no-repeat bg-cover bg-center`}
      style={
        singleBoard.img.type === "imageUrl"
          ? { backgroundImage: `url(${singleBoard.img.url})` }
          : singleBoard.img.type === "linearGradient"
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${singleBoard.img.from}, ${singleBoard.img.to})`,
            }
          : { background: singleBoard.img.code }
      }
    >
      <BoardMenu />
      <LocalContent />
    </div>
  );
}

const LocalContent = () => {
  const [showBoxAddList, setShowBoxAddList] = useState(false);
  const [lists, setLists] = useState<ListType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const listsId = useMemo(() => lists.map((item) => item.id), [lists]);
  const [newTitle, setNewTitle] = useState<string>("");
  const { singleBoard } = useSelector((state: RootState) => state.board);

  // get lists from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      let list = null;
      try {
        const stored = localStorage.getItem("lists");
        if (stored) list = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (list !== null && list.length > 0) {
        setLists(list);
      }
      if (list === null) setLists(initialLists);
    }
    fetchListsFromLocalStorage();
  }, []);
  // save lists to localStorage after update list
  useEffect(() => {
    if (lists.length <= 0) return;
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);
  // get tasks from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      let task = null;
      try {
        const stored = localStorage.getItem("tasks");
        if (stored) task = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (task !== null && task.length > 0) {
        setTasks(task);
      }
      if (task === null) setTasks(initialTasks);
    }
    fetchListsFromLocalStorage();
  }, []);
  // save tasks to localStorage after update task
  useEffect(() => {
    if (tasks.length <= 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenBoxAddList = () => {
    setShowBoxAddList(true);
  };
  const handleCloseBoxAddList = () => {
    setShowBoxAddList(false);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);
  const handleScroll = () => {
    if (scrollRef.current) {
      scrollPosition.current = scrollRef.current.scrollLeft;
    }
  };

  // Restore scroll position after `AddBox UI` update
  useEffect(() => {
    const scrollCur = scrollRef.current;
    if (scrollCur) {
      const maxScrollLeft = scrollCur.scrollWidth - scrollCur.clientWidth;
      scrollCur.scrollLeft = maxScrollLeft;
    }
  }, [showBoxAddList, newTitle]); // Runs when `AddBox UI` update
  // Restore scroll position after `listData` update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition.current;
    }
  }, [lists]); // Runs when `listData` update

  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  function createNewList(boardId: Id, title: string) {
    const listToAdd: ListType = {
      id: generateId(),
      title: title,
      boardId: boardId,
    };
    setLists([...lists, listToAdd]);
  }
  function updateList(id: Id, title: string) {
    const newLists = lists.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setLists(newLists);
  }
  function updateTaskChecked(id: Id, checked: boolean) {
    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item;
      return { ...item, checked };
    });
    setTasks(newTasks);
  }
  function updateTask(id: Id, content: string) {
    console.log("new taskssssss", id, content);
    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item;
      return { ...item, content };
    });
    setTasks(newTasks);
  }
  function createNewTask(listId: Id, content: string) {
    const newTask = {
      id: generateId(),
      listId: listId,
      content: content,
      checked: false,
    };
    setTasks([...tasks, newTask]);
  }
  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveList(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeListId = active.id;
    const overListId = over.id;
    if (activeListId === overListId) return;

    setLists((board) => {
      const activeListIndex = board.findIndex(
        (item) => item.id === activeListId
      );
      const overListIndex = board.findIndex((item) => item.id === overListId);
      return arrayMove(lists, activeListIndex, overListIndex);
    });
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    if (!isActiveTask) return;

    // I'm dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        tasks[activeIndex].listId = tasks[overIndex].listId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";

    // I'm dropping a Task over a column
    if (isActiveTask && isOverAList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].listId = overId;
        // console.log(
        //   `$List$ | activeIndex ${activeIndex}, overId ${overId}, tasks[activeIndex].listId ${tasks[activeIndex].listId} `
        // );
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
  function handleDeleteTask(id: Id) {
    let newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }
  return (
    <div
      ref={scrollRef}
      className="flex gap-2 h-[92%] w-full p-2 overflow-x-auto overflow-y-hidden"
      onScroll={handleScroll}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <SortableContext items={listsId}>
          {lists
            .filter((list) => list.boardId === singleBoard.id)
            .map((list) => (
              <List
                list={list}
                key={list.id}
                updateList={updateList}
                updateTask={updateTask}
                updateTaskChecked={updateTaskChecked}
                createNewTask={createNewTask}
                handleDeleteTask={handleDeleteTask}
                tasks={tasks.filter((task) => task.listId === list.id)}
              ></List>
            ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeList && (
              <List
                list={activeList}
                updateList={updateList}
                updateTask={updateTask}
                updateTaskChecked={updateTaskChecked}
                createNewTask={createNewTask}
                handleDeleteTask={handleDeleteTask}
                tasks={tasks.filter((task) => task.listId === activeList.id)}
              ></List>
            )}
            {activeTask && (
              <CardItem
                task={activeTask}
                className="!bg-gray-400 bg-opacity-75 skew-x-2 rotate-6 opacity-60"
              ></CardItem>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <ListContainer>
        {!showBoxAddList && (
          <AddBtn text="Add a list" onClick={handleOpenBoxAddList} />
        )}
        {showBoxAddList && (
          <AddBox
            placeholder="Enter list name..."
            btnText="Add list"
            onClose={handleCloseBoxAddList}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (newTitle) {
                createNewList(singleBoard.id, newTitle);
                setNewTitle("");
              }
            }}
            onChange={(e) => setNewTitle(e.target.value)}
            onClickBtnAdd={() => {
              if (newTitle) {
                createNewList(singleBoard.id, newTitle);
                handleCloseBoxAddList();
                setNewTitle("");
              }
            }}
            value={newTitle}
          />
        )}
      </ListContainer>
    </div>
  );
};
