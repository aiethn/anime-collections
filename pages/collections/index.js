import { css } from "@emotion/react";
import { ButtonClick } from "../../components/buttonClick";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BackButton } from "../../components/backButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddCollection } from "../../components/modals/addCollection";
import { CardCollection } from "../../components/cardCollection";
import { fetchCollections } from "../../features/collections";
import { EditCollection } from "../../components/modals/editCollection";

export default function Collections() {
  const dispatch = useDispatch();
  const allCol = useSelector((state) => state.collections.value);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchCollections());
  // }, []);

  console.log(allCol);

  const handleOnClick = () => {};

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
          <ButtonClick
            logo={faPlus}
            text="Add New Collection"
            onClick={setShowModalAdd}
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
            <>
              <CardCollection
                setShowModalEdit={setShowModalEdit}
                key={idx}
                id={col.id}
                linkImage={`/collections/${col.id}`}
                name={col.colName}
                image="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png"
              />
            </>
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
        />
      )}
    </div>
  );
}
