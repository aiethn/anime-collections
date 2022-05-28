import { useRouter } from "next/router";
import { BackButton } from "../../components/backButton";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { CardCollection } from "../../components/cardCollection";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export default function CollectionDetailsID() {
  const allCol = useSelector((state) => state.collections.value);
  const router = useRouter();
  const colID = router.query["col-id"];
  const colSelected = allCol.find((col) => col.id == colID);
  const itemSelected = colSelected?.colItems;

  console.log(itemSelected, "itemSelected");

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
          <h2>Collections ID salah</h2>
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
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
