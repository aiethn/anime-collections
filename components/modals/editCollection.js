import { css } from "@emotion/react";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCol, addNewCol, editCol } from "../../features/collections";

export const EditCollection = ({ setShowModalEdit, colID, colName }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showErrorValid, setShowErrorValid] = useState("");
  const handleOnChange = (e) => {
    const userInput = e.target.value;
    setName(userInput);
  };

  const handleOnSave = (colId, colName) => {
    if (!name) setShowErrorValid("empty");
    else if (!name.match(/(?!^\s+$)^.*$/)) setShowErrorValid("space");
    else if (name.match(/[^a-zA-Z0-9\s]/)) setShowErrorValid("character");
    else if (name.length > 16) setShowErrorValid("length");
    else {
      setShowModalEdit(true);
      setShowErrorValid("");
      dispatch(editCol({ id: colID, newName: name.toUpperCase() }));
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
            max-width: 40rem;
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
                Edit {colName} Name
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
                    {showErrorValid === "length" &&
                      "No more then 16 characters!"}
                    {showErrorValid === "avail" &&
                      "Name collection already exist!"}
                  </p>
                )}
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
                    setShowModalEdit(true);
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
                  Edit
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
