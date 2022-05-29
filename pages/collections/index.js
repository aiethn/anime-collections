import { css } from "@emotion/react";
import { ButtonClick } from "../../components/buttonClick";
import {
  faCheck,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { BackButton } from "../../components/backButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddCollection } from "../../components/modals/addCollection";
import { CardCollection } from "../../components/cardCollection";
import { fetchCollections, removeCol } from "../../features/collections";
import { EditCollection } from "../../components/modals/editCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemoveCollection } from "../../components/modals/removeCollection";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export default function Collections() {
  const dispatch = useDispatch();
  const allCol = useSelector((state) => state.collections.value);
  const [showEdit, setShowEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [idRemove, setIdRemove] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [nameRemove, setNameRemove] = useState("");

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  const handleOnEdit = (id, name) => {
    setIdEdit(id);
    setNameEdit(name);
    setShowModalEdit(true);
  };

  const handleOnRemove = (id, name) => {
    setIdRemove(id);
    setNameRemove(name);
    setShowModalRemove(true);
    // dispatch(removeCol(id));
  };

  return (
    <div>
      {/* <BackButton pathBack={"/"} /> */}
      <div
        css={css`
          margin-left: auto;
          margin-right: auto;
          max-width: 64rem;
        `}
      >
        <h1
          css={css`
            font-size: 2.25rem;
            line-height: 2.5rem;
            text-align: center;
          `}
        >
          ALL COLLECTIONS
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: end;
            margin-left: 3rem;
            margin-right: 3rem;
          `}
        >
          <div
            css={css`
              margin-right: 1rem;
            `}
          >
            <ButtonClick
              logo={faPlus}
              text="Add New Collection"
              onClick={setShowModalAdd}
            />
          </div>
          <ButtonClick
            css={css`
              margin-left: 1rem;
            `}
            logo={!showEdit ? faPencil : faCheck}
            text={!showEdit ? "Edit Collection" : "Done Edit"}
            onClick={(e) => setShowEdit(!showEdit)}
          />
        </div>
        {/* Card */}
        <div
          css={css`
            margin-top: 2rem;
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {allCol?.map((col, idx) => (
            <div
              key={idx}
              className="container"
              css={css`
                margin-top: 3rem;
                padding: 0.7rem;
                height: 100%;
                max-width: 34rem;
                ${mq[1]} {
                  width: 25%;
                }
                ${maxq[1]} {
                  width: 33%;
                }
                ${maxq[0]} {
                  width: 50%;
                }
              `}
            >
              <CardCollection
                setShowModalEdit={setShowModalEdit}
                id={col.id}
                linkImage={`/collections/${col.id}`}
                name={col.colName}
                image="/banner.jpg"
                usage="collection"
              />
              {showEdit && (
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                  `}
                >
                  <div
                    onClick={(e) => handleOnEdit(col.id, col.colName)}
                    css={css`
                      display: flex;
                      position: absolute;
                      left: 0;
                      cursor: pointer;
                      &:hover {
                        color: rgba(101, 198, 187, 0.9);
                      }
                    `}
                  >
                    <FontAwesomeIcon
                      css={css`
                        width: 1rem;
                        margin: 0.5rem;
                      `}
                      icon={faPencil}
                      size="xs"
                    />
                    <p>Edit</p>
                  </div>

                  <div
                    onClick={(e) => handleOnRemove(col.id, col.colName)}
                    css={css`
                      display: flex;
                      position: absolute;
                      right: 0;
                      cursor: pointer;
                      &:hover {
                        color: rgba(101, 198, 187, 0.9);
                      }
                    `}
                  >
                    <FontAwesomeIcon
                      css={css`
                        width: 1rem;
                        margin: 0.5rem;
                      `}
                      icon={faTrash}
                    />
                    <p>Remove</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showModalAdd && (
        <AddCollection
          setShowModalAdd={(e) => setShowModalAdd(!showModalAdd)}
        />
      )}
      {showModalEdit && (
        <EditCollection
          setShowModalEdit={(e) => setShowModalEdit(!showModalEdit)}
          colID={idEdit}
          colName={nameEdit}
        />
      )}
      {showModalRemove && (
        <RemoveCollection
          setShowModalRemove={(e) => setShowModalRemove(!showModalRemove)}
          colID={idRemove}
          colName={nameRemove}
        />
      )}
    </div>
  );
}
