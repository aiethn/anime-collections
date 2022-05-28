import { css } from "@emotion/react";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCol, addNewCol } from "../../features/collections";

export const AddItems = ({ setShowModalAdd, anime }) => {
  const dispatch = useDispatch();
  const [colSelected, setColSelected] = useState([]);
  const allCol = useSelector((state) => state.collections.value);
  const handleOnSave = () => {
    if (colSelected) {
      colSelected.forEach((colID) => {
        dispatch(addItemToCol({ id: colID, items: anime }));
      });
      setShowModalAdd(true);
    }
  };

  console.log(anime, "anime");

  const handleOnClick = (colID) => {
    const isAvail = colSelected.includes(colID);
    if (!isAvail) {
      setColSelected((prev) => [...prev, colID]);
    } else {
      const newColSelected = colSelected.filter((col) => col !== colID);
      setColSelected(newColSelected);
    }
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          overflow-y: auto;
          overflow-x: hidden;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          align-items: center;
          &:focus {
            outline: 0;
          }
          margin-left: 3rem;
          margin-right: 3rem;
        `}
      >
        <div
          css={css`
            position: relative;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            width: 100%;
            max-width: 60rem;
            margin-left: auto;
            margin-right: auto;
          `}
        >
          {/*content*/}
          <div
            css={css`
              display: flex;
              position: relative;
              background-color: #ffffff;
              flex-direction: column;
              width: 100%;
              border-radius: 0.5rem;
              border-width: 0;
              outline: 0;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
            `}
          >
            {/*body*/}
            <div
              css={css`
                padding: 1.25rem;
                text-align: center;
                flex: 1 1 auto;
                justify-content: center;
              `}
            >
              <p
                css={css`
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                  font-size: 1.875rem;
                  line-height: 2.25rem;
                  font-weight: 700;
                `}
              >
                Add New Item To Collections
              </p>
              {/* <p>Select Collection</p> */}
              <div
                css={css`
                  margin-bottom: 1.5rem;
                `}
              >
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  {allCol.map(function (col) {
                    const isAvail = col.colItems.find(
                      (x) => x?.animeID === anime.animeID
                    );
                    return (
                      <div
                        key={col.id}
                        onClick={(e) => !isAvail && handleOnClick(col.id)}
                        css={css`
                          padding: 0.5rem;
                          margin: 0.2rem;
                          justify-content: center;
                          text-align: center;
                          align-items: center;
                          border: 1px solid black;
                          min-width: 100px;
                          cursor: pointer;
                          ${colSelected.includes(col.id) &&
                          "background-color: rgba(101, 198, 187, 0.3)"}
                          ${isAvail && "cursor:default"}
                        `}
                      >
                        <p>{col.colName}</p>{" "}
                        {isAvail && <p>(already available)</p>}
                      </div>
                    );
                  })}

                  {/* {allCol.map((col) => (
                    <div
                      key={col.id}
                      onClick={(e) => handleOnClick(col.id)}
                      css={css`
                        padding: 0.5rem;
                        margin: 0.2rem;
                        cursor: pointer;
                        border: 1px solid black;
                        min-width: 100px;
                        ${colSelected.includes(col.id) &&
                        "background-color: green"}
                      `}
                    >
                      <p>{col.colName}</p>
                    </div>
                  ))} */}
                </div>
                {/* {showErrorValid && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {showErrorValid === "character" &&
                      "No special characters allowed!"}
                    {showErrorValid === "empty" && "Cannot Empty!"}
                    {showErrorValid === "avail" &&
                      "Name collection already exist!"}
                  </p>
                )} */}
                {/* {showSuccessSubmit && (
                  <p
                    css={css`
                      color: green;
                    `}
                  >
                    Collection Added!
                  </p>
                )} */}
              </div>
            </div>
            {/*footer*/}
            <div
              css={css`
                display: flex;
                padding: 1.5rem;
                padding-top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom-right-radius: 0.25rem;
                border-bottom-left-radius: 0.25rem;
              `}
            >
              <div
                css={css`
                  padding: 0.75rem;
                  margin-left: 1rem;
                  text-align: center;
                  @media (min-width: 768px) {
                    display: block;
                  }
                `}
              >
                <button
                  onClick={(e) => {
                    setShowModalAdd(true);
                  }}
                  css={css`
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    padding-left: 1.25rem;
                    padding-right: 1.25rem;
                    margin-bottom: 0.5rem;
                    margin-right: 1rem;
                    background-color: rgba(207, 0, 15, 0.5);
                    color: #4b5563;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    border-radius: 9999px;
                    border-width: 1px;
                    border-color: rgba(207, 0, 15, 0.5);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                    color: white;

                    &:hover {
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
                      background-color: #f3f4f6;
                      color: black;
                    }

                    @media (min-width: 768px) {
                      margin-bottom: 0;
                    }
                  `}
                >
                  Cancel
                </button>
                <button
                  onClick={handleOnSave}
                  css={css`
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    padding-left: 1.25rem;
                    padding-right: 1.25rem;
                    margin-bottom: 0.5rem;
                    margin-left: 1rem;
                    background-color: rgba(27, 163, 156, 0.5);
                    color: #4b5563;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    border-radius: 9999px;
                    border-width: 1px;
                    border-color: rgba(27, 163, 156, 0.5);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                    color: white;
                    &:hover {
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
                      background-color: #f3f4f6;
                      color: black;
                    }
                    @media (min-width: 768px) {
                      margin-bottom: 0;
                    }
                  `}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        css={css`
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 40;
          background-color: #000000;
          opacity: 0.25;
        `}
      ></div>
    </>
  );
};
