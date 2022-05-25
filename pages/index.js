import { css } from "@emotion/react";
import { gql, useQuery } from "@apollo/client";
import { Card } from "../components/card";
import { useState } from "react";

export default function Home() {
  const [pagination, setPagination] = useState(1);
  const { loading, error, data } = useQuery(GET_ANIME_DATA, {
    variables: { page: pagination, perPage: 10 },
  });

  const dataChar = data?.Page.characters;

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
        Anime Collections
      </h1>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {dataChar.map((char) => (
          <>
            <Card
              key={char.id}
              name={char.name.full}
              nameNative={char.name.native}
              description={char.description}
              gender={char.gender}
              image={char.image.medium}
            />
          </>
        ))}
      </div>
      {pagination - 1 !== 0 && (
        <button onClick={() => setPagination(pagination - 1)}>Prev</button>
      )}

      <button onClick={() => setPagination(pagination + 1)}>Next</button>
    </div>
  );
}

const GET_ANIME_DATA = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      characters {
        id
        gender
        name {
          full
          native
        }
        description(asHtml: true)
        image {
          medium
        }
      }
    }
  }
`;
