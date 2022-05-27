import { css } from "@emotion/react";
import { gql, useQuery } from "@apollo/client";
import { Card } from "../components/card";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [idxpagination, setIdxPagination] = useState(1);
  const { loading, error, data } = useQuery(GET_ALL_ANIME_DATA, {
    variables: { page: idxpagination, perPage: 10 },
  });

  const dataAnime = data?.Page.media;

  const paginationHandler = (idx) => {
    setIdxPagination(idx.selected + 1);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);
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
        Anime List
      </h1>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {dataAnime.map((char) => (
          <>
            <Card
              key={char.id}
              animeID={char.id}
              title={char.title.english}
              titleNative={char.title.native}
              image={char.coverImage.large}
            />
          </>
        ))}
      </div>
      <div>
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={"active"}
          containerClassName={"pagination"}
          subContainerClassName={"pagesPagination"}
          initialPage={idxpagination - 1}
          pageCount={data.Page.pageInfo.lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </div>
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
