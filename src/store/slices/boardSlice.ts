import { Board } from "@/components/popup/PopupCreateboard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
  value: number;
  boards: Board[];
  singleBoard: Board;
  boardName: boolean;
  loadingFetchBoards: boolean;
  showCreateboard: boolean;
}

const initialState: BoardState = {
  value: 0,
  boards: [],
  singleBoard: {
    id: 1,
    title: "2",
    img: { type: "imageUrl", url: "", alt: "" },
  },
  loadingFetchBoards: false,
  boardName: false,
  showCreateboard: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setBoards: (state, action) => ({
      ...state,
      boards: action.payload,
    }),
    setSingleBoard: (state, action) => ({
      ...state,
      singleBoard: action.payload,
    }),
    handleOpenAndClosePopupCreateboard: (
      state,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      showCreateboard: action.payload,
    }),
  },
});

export const {
  increment,
  decrement,
  setBoards,
  setSingleBoard,
  handleOpenAndClosePopupCreateboard,
} = boardSlice.actions;
export default boardSlice.reducer;
