export const localSave = (store) => (next) => (action) => {
  if (action.type === "collections/addNewCol") {
    let newVal = {
      id: action.payload.id,
      colName: action.payload.name,
      colItems: [],
    };
    const addNewCol = (item) => {
      if (item) {
        let prev = JSON.parse(localStorage.getItem("collections"));
        if (prev != null) {
          return JSON.stringify([...prev, item]);
        }
        return JSON.stringify([item]);
      }
    };
    localStorage.setItem("collections", addNewCol(newVal));
  } else if (action.type === "collections/removeCol") {
    const localCol = window.localStorage.getItem("collections");
    if (localCol) {
      const localColArr = JSON.parse(localCol);
      const restCol = localColArr.filter((col) => col.id !== action.payload);
      window.localStorage.setItem("collections", JSON.stringify(restCol));
    }
  }

  return next(action);
};
