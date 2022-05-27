import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addNewCol: (state, action) => {
      state.value.push({
        colName: action.payload,
        colItems: [],
      });
    },
    addItemToCol: (state, action) => {},
    removeCol: (state, action) => {},
    removeItemCol: (state, action) => {},
  },
});

export const { addNewCol, addItemToCol, removeCol, removeItemCol } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;
