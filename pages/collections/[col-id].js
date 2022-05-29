import { useRouter } from "next/router";
import { BackButton } from "../../components/backButton";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { CardCollection } from "../../components/cardCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ButtonClick } from "../../components/buttonClick";
import { useEffect, useState } from "react";
import { RemoveItem } from "../../components/modals/removeItem";
import { EditCollection } from "../../components/modals/editCollection";
import { fetchCollections } from "../../features/collections";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export default function CollectionDetailsID() {
  const dispatch = useDispatch();
  const allCol = useSelector((state) => state.collections.value);
  const isFetching = useSelector((state) => state.collections.isFetching);
  const router = useRouter();
  const [showRemove, setShowRemove] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [removeAnime, setRemoveAnime] = useState("");
  // const [colSelected, setColSelected] = useState("");
  // const [itemSelected, setItemSelected] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);
  const colID = router.query["col-id"];
  const colSelected = allCol?.find((col) => col.id == colID);
  const itemSelected = colSelected?.colItems;

  console.log(isFetching, "isFetching");

  useEffect(() => {
    dispatch(fetchCollections());
    // setIsUpdate(true);
  }, []);

  // useEffect(() => {
  //   if (isUpdate) {
  //     const colSelected = allCol.find((col) => col.id == colID);
  //     setColSelected(colSelected);
  //     const itemSelected = colSelected?.colItems;
  //     setItemSelected(itemSelected);
  //   }
  // }, [allCol]);

  const handleOnRemove = (animeID, animeName) => {
    setShowModalRemove(true);
    setRemoveAnime({ animeID: animeID, animeName: animeName });
  };

  const handleOnEditCol = () => {
    setShowModalEdit(true);
  };

  // if (isFetching) {
  //   return <div>Loading</div>;
  // }

  if (!colSelected)
    return (
      <div
        css={css`
          height: 100vh;
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          {/* <h2>Collections ID salah</h2> */}
        </div>
      </div>
    );

  return (
    <div>
      {/* <BackButton pathBack={"/collections"} /> */}
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
          {colSelected.colName} COLLECTIONS
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: end;
            margin-left: 3rem;
            margin-right: 1rem;
          `}
        >
          <div
            css={css`
              margin-right: 1rem;
            `}
          >
            <ButtonClick
              logo={faPencil}
              text="Edit Collection Name"
              onClick={(e) => setShowModalEdit(true)}
            />
          </div>

          <ButtonClick
            css={css`
              margin-left: 1rem;
            `}
            logo={!showRemove ? faTrash : faCheck}
            text={!showRemove ? "Remove Item" : "Done Remove"}
            onClick={(e) => setShowRemove(!showRemove)}
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
          {itemSelected.map((anime, idx) => (
            <>
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
                  key={idx}
                  linkImage={`/anime-details/${anime.animeID}`}
                  id={anime.animeID}
                  name={anime.animeName}
                  image={anime.animeImage}
                  usage="anime"
                />
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                  `}
                >
                  {showRemove && (
                    <div
                      onClick={(e) =>
                        handleOnRemove(anime.animeID, anime.animeName)
                      }
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
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {showModalRemove && (
        <RemoveItem
          setShowModalRemove={(e) => setShowModalRemove(!showModalRemove)}
          colID={colID}
          anime={removeAnime}
        />
      )}
      {showModalEdit && (
        <EditCollection
          setShowModalEdit={(e) => setShowModalEdit(!showModalEdit)}
          colID={colID}
          colName={colSelected.colName}
        />
      )}
    </div>
  );
}
