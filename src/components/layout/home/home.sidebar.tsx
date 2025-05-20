"use client";
import Button from "../../button/Button";
import PopupCreateboard from "../../popup/PopupCreateboard";
import { useLayoutStates } from "@/contexts/layoutStates";
import { usePathname } from "next/navigation";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenAndClosePopupCreateboard } from "@/store/slices/boardSlice";

const HomeSidebar = ({ children }: { children: React.ReactNode }) => {
  const { showHomeSidebar } = useLayoutStates();
  const { showCreateboard } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  return (
    <>
      {/* Popup */}
      <PopupCreateboard
        show={showCreateboard}
        onClose={() => dispatch(handleOpenAndClosePopupCreateboard(false))}
      ></PopupCreateboard>
      {/* Popup ^ */}
      {showHomeSidebar && (
        <div className={`home-sidebar relative p-4 shrink-0 w-[260px]`}>
          {children}
          <div className="bg-f2Color absolute bottom-2 left-0 right-0 px-4">
            <Button
              href="/trash"
              className={`!justify-start gap-3 w-full hover:bg-primaryHover ${
                pathname === "/trash/"
                  ? "bg-primaryHover text-primaryColor"
                  : "text-primaryText"
              }`}
            >
              <DeleteIcon />
              Trash
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSidebar;
