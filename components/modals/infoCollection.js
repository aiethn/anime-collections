import { css } from "@emotion/react";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCol,
  addNewCol,
  fetchCollections,
} from "../../features/collections";
import Link from "next/link";

export const InfoCollection = ({ setShowModalInfo, anime }) => {
  const dispatch = useDispatch();
  const [colSelected, setColSelected] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const allCol = useSelector((state) => state.collections.value);
  const [showErrorValid, setShowErrorValid] = useState("");

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  const handleOnSave = () => {
    if (colSelected) {
      colSelected.forEach((colID) => {
        dispatch(addItemToCol({ id: colID, items: anime }));
      });
      setShowModalInfo(true);
    }
  };

  const handleOnChange = (e) => {
    const userInput = e.target.value;
    setName(userInput);
  };

  const handleOnClick = (colID) => {
    const isAvail = colSelected.includes(colID);
    if (!isAvail) {
      setColSelected((prev) => [...prev, colID]);
    } else {
      const newColSelected = colSelected.filter((col) => col !== colID);
      setColSelected(newColSelected);
    }
  };

  const handleOnSaveCol = () => {
    if (!showInput) setShowInput(true);
    else {
      if (!name) setShowErrorValid("empty");
      else if (!name.match(/(?!^\s+$)^.*$/)) setShowErrorValid("space");
      else if (name.match(/[^a-zA-Z0-9\s]+/)) setShowErrorValid("character");
      else if (name.length > 16) setShowErrorValid("length");
      else {
        const isAvail = allCol.findIndex(
          (data) => data.colName === name.toUpperCase()
        );

        if (isAvail === -1) {
          dispatch(addNewCol({ id: uuid(), name: name.toUpperCase() }));
          setShowErrorValid("");
          setName("");
          setShowInput(false);
        } else {
          setShowErrorValid("avail");
        }
      }
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
                {anime.animeName}{" "}
                <span
                  css={css`
                    font-weight: 300;
                  `}
                >
                  Has Added in
                </span>
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
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  {!showInput ? (
                    allCol.map(function (col) {
                      const isAvail = col.colItems.find(
                        (x) => x?.animeID === anime.animeID
                      );
                      if (isAvail) {
                        return (
                          // <div
                          //   key={col.id}
                          //   onClick={(e) => !isAvail && handleOnClick(col.id)}
                          //   css={css`
                          //     padding: 0.5rem;
                          //     margin: 0.2rem;
                          //     border: 1px solid black;
                          //     border-radius: 1rem;
                          //     cursor: pointer;
                          //     flex: 0 0 auto;
                          //     min-width: 7rem;
                          //     ${colSelected.includes(col.id) &&
                          //     "background-color: rgba(22, 160, 133, 0.7)"}
                          //     ${isAvail && "cursor:default"};
                          //   `}
                          // >
                          //   <p>{col.colName}</p>{" "}
                          // </div>
                          <Link href={`/collections/${col.id}`}>
                            <button
                              css={css`
                                background-color: #fff;
                                border: 1px solid #d5d9d9;
                                border-radius: 8px;
                                box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
                                box-sizing: border-box;
                                color: #0f1111;
                                cursor: pointer;
                                display: inline-block;
                                font-size: 1.2rem;
                                padding: 1rem 1.2rem;
                                line-height: 29px;
                                position: relative;
                                text-align: center;
                                text-decoration: none;
                                user-select: none;
                                -webkit-user-select: none;
                                touch-action: manipulation;
                                vertical-align: middle;
                                margin: 0.5rem;
                                &:hover {
                                  background-color: #f7fafa;
                                }
                                &:focus {
                                  border-color: #008296;
                                  box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px
                                    0;
                                  outline: 0;
                                }
                                @media (max-width: 768px) {
                                  margin: 0.2rem 0.2rem;
                                  padding: 0.6rem 0.6rem;
                                  font-size: 0.8rem;
                                }
                              `}
                              role="button"
                            >
                              {col.colName}
                            </button>
                          </Link>
                        );
                      }
                    })
                  ) : (
                    <input
                      type="text"
                      id="large-input"
                      value={name}
                      onChange={(e) => handleOnChange(e)}
                      css={css`
                        display: block;
                        padding: 1rem;
                        background-color: #f9fafb;
                        color: #111827;
                        width: 100%;
                        border-radius: 0.5rem;
                        border-width: 1px;
                        border-color: #d1d5db;
                        @media (min-width: 640px) {
                          font-size: 1rem;
                          line-height: 1.5rem;
                        }
                        &:focus {
                          border-color: blue;
                          --ring-color: #3b82f6;
                        }
                      `}
                    />
                  )}
                </div>
                {showErrorValid && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {showErrorValid === "character" &&
                      "No special characters allowed!"}
                    {showErrorValid === "empty" && "Cannot Empty!"}
                    {showErrorValid === "space" &&
                      "Cannot Only Contain Whitespace!"}
                    {showErrorValid === "avail" &&
                      "Name collection already exist!"}
                    {showErrorValid === "length" &&
                      "No more then 16 characters!"}
                  </p>
                )}
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
                    setShowModalInfo(true);
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
                  Close
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
