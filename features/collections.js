import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  value: [],
};

export const fetchCollections = createAsyncThunk(
  "collections/fetchCollections",
  () => {
    const col = JSON.parse(localStorage.getItem("collectionss"));
    return col ? col : [];
  }
);

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addNewCol: (state, action) => {
      state.value.push({
        id: uuid(),
        colName: action.payload,
        colItems: [],
      });
    },
    addItemToCol: (state, action) => {
      const newVal = state.value.map(function (col) {
        if (col.id === action.payload.id) {
          const newItems = col.colItems
            ? [...col.colItems, action.payload.items]
            : [action.payload.items];
          return {
            id: action.payload.id,
            colName: col.colName,
            colItems: newItems,
          };
        } else return col;
      });
      state.value = newVal;
    },
    removeCol: (state, action) => {
      const newVal = state.value.filter((col) => col.id !== action.payload);
      state.value = newVal;
    },
    removeItemCol: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { addNewCol, addItemToCol, removeCol, removeItemCol } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;
