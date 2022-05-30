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
  } else if (action.type === "collections/editCol") {
    const localCol = window.localStorage.getItem("collections");
    if (localCol) {
      const localColArr = JSON.parse(localCol);
      const restCol = localColArr.map(function (col) {
        if (col.id === action.payload.id) {
          return {
            id: col.id,
            colName: action.payload.newName,
            colItems: col.colItems,
          };
        } else return col;
      });
      window.localStorage.setItem("collections", JSON.stringify(restCol));
    }
  } else if (action.type === "collections/addItemToCol") {
    const localCol = window.localStorage.getItem("collections");
    if (localCol) {
      const localColArr = JSON.parse(localCol);
      const restCol = localColArr.map(function (col) {
        if (col.id === action.payload.id) {
          const isAvail = col.colItems.find(
            (anime) => anime.animeID === action.payload.items.animeID
          );
          if (!isAvail) {
            const newItems = col.colItems
              ? [...col.colItems, action.payload.items]
              : [action.payload.items];
            return {
              id: action.payload.id,
              colName: col.colName,
              colItems: newItems,
            };
          } else return col;
        } else return col;
      });
      var uniqueNewVal = restCol.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
      window.localStorage.setItem("collections", JSON.stringify(uniqueNewVal));
    }
  } else if (action.type === "collections/removeItemFromCol") {
    const localCol = window.localStorage.getItem("collections");
    if (localCol) {
      const localColArr = JSON.parse(localCol);
      const restCol = localColArr.map(function (col) {
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
      window.localStorage.setItem("collections", JSON.stringify(restCol));
    }
  }

  return next(action);
};
