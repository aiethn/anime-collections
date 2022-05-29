import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  if (typeof window !== "undefined") {
    const localCollections = window.localStorage.getItem("collections");
    if (localCollections) {
      return JSON.parse(localCollections);
    }
    window.localStorage.setItem("collections", JSON.stringify([]));
    return [];
  }
};

const initialState = {
  value: [],
};

// export const fetchCollections = createAsyncThunk(
//   "collections/fetchCollections",
//   () => {
//     const col = JSON.parse(localStorage.getItem("collectionss"));
//     return col ? col : [];
//   }
// );

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addNewCol: (state, action) => {
      const newVal = {
        id: action.payload.id,
        colName: action.payload.name,
        colItems: [],
      };
      state.value.push(newVal);
      // const localCol = window.localStorage.getItem("collections");
      // if (localCol) {
      //   const localColArr = JSON.parse(localCol);
      //   localColArr.push({ ...newVal });
      //   window.localStorage.setItem("collections", JSON.stringify(localColArr));
      // } else {
      //   window.localStorage.setItem(
      //     "collections",
      //     JSON.stringify([{ ...newVal }])
      //   );
      // }
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
    removeItemFromCol: (state, action) => {
      const newVal = state.value.map(function (col) {
        if (col.id === action.payload.id) {
          const newItems = col.colItems.filter(
            (item) => item.animeID !== action.payload.animeID
          );
          return {
            id: action.payload.id,
            colName: col.colName,
            colItems: newItems,
          };
        } else return col;
      });
      state.value = newVal;
    },
    editCol: (state, action) => {
      const newVal = state.value.map(function (col) {
        if (col.id === action.payload.id) {
          return {
            id: col.id,
            colName: action.payload.newName,
            colItems: col.colItems,
          };
        } else return col;
      });
      state.value = newVal;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchCollections.fulfilled, (state, action) => {
  //     state.value = action.payload;
  //   });
  // },
});

export const {
  addNewCol,
  addItemToCol,
  removeCol,
  removeItemFromCol,
  editCol,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
