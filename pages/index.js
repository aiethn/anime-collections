import { css } from "@emotion/react";
import { gql, useQuery } from "@apollo/client";
import { Card } from "../components/card";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ButtonClick } from "../components/buttonClick";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AddItems } from "../components/modals/addItems";

export default function Home() {
  const [bulkAdd, setBulkAdd] = useState(false);
  const [idxpagination, setIdxPagination] = useState(1);
  const [animeSelected, setAnimeSelected] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { loading, error, data } = useQuery(GET_ALL_ANIME_DATA, {
    variables: { page: idxpagination, perPage: 10 },
  });
  const dataAnime = data?.Page.media;

  const paginationHandler = (idx) => {
    setIdxPagination(idx.selected + 1);
  };

  const handleOnLongPress = (value) => {
    setBulkAdd(true);
    const isAvail = animeSelected.find(
      (anime) => anime.animeID === value.animeID
    );
    if (!isAvail) {
      if (animeSelected) {
        setAnimeSelected((prev) => [...prev, value]);
      } else {
        setAnimeSelected([value]);
      }
    } else {
      const newVal = animeSelected.filter(
        (anime) => anime.animeID !== value.animeID
      );
      setAnimeSelected(newVal);
      if (newVal.length === 0) {
        setBulkAdd(false);
      }
    }
  };

  const handleOnCancel = () => {
    setBulkAdd(false);
    setAnimeSelected([]);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
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
        ANIME LIST
      </h1>
      {/* BUTTON BULK ADD */}
      {bulkAdd && (
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
              text="Add To Collection"
              onClick={setShowModalAdd}
            />
          </div>
          <ButtonClick
            logo={faXmark}
            handleOnCancel
            text="Cancel"
            onClick={handleOnCancel}
          />
        </div>
      )}
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {dataAnime.map((char) => (
          <Card
            key={char.id}
            animeID={char.id}
            title={char.title.english}
            titleNative={char.title.native}
            image={char.coverImage.large}
            bulkAdd={bulkAdd}
            isSelected={handleOnLongPress}
            animeSelected={animeSelected}
          />
        ))}
      </div>
      <div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={"active"}
          containerClassName={"pagination"}
          subContainerClassName={"pagesPagination"}
          initialPage={idxpagination - 1}
          pageCount={data.Page.pageInfo.lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={paginationHandler}
        />
      </div>
      {showModalAdd && (
        <AddItems
          setShowModalAdd={(e) => setShowModalAdd(!showModalAdd)}
          anime={animeSelected}
          toggleBulk={(e) => setBulkAdd(e)}
          usage="bulk"
        />
      )}
    </div>
  );
}

const GET_ALL_ANIME_DATA = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          native
          english
        }
        coverImage {
          large
        }
      }
    }
  }
`;
