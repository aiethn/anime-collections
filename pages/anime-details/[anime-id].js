import { gql, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Rating from "react-rating";
// import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faList,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonClick } from "../../components/buttonClick";
import { useEffect, useState } from "react";
import { AddItems } from "../../components/modals/addItems";
import { fetchCollections } from "../../features/collections";
import { useDispatch } from "react-redux";
import { InfoCollection } from "../../components/modals/infoCollection";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export default function AnimeDetailsID() {
  const dispatch = useDispatch();
  const router = useRouter();
  const animeID = router.query["anime-id"];
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: animeID },
  });
  const dataAnime = data?.Media;

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div>
      <div
        css={css`
          margin-left: auto;
          margin-right: auto;
          max-width: 64rem;
          margin-bottom: 3rem;
        `}
      >
        {/* all container */}
        <div
          css={css`
            padding-top: 1rem;
            display: flex;
            flex: 1 1 0%;
            justify-content: center;
            flex-direction: column;
            ${mq[1]} {
              flex-direction: row;
            }
          `}
        >
          {/* gambar */}
          <div
            css={css`
              filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
              padding: 0 1rem 0 2rem;
              width: 18rem;
              flex: none;
              justify-content: center;
              ${mq[1]} {
                display: flex;
                width: 40%;
              }
              ${maxq[1]} {
                margin-left: 2rem;
              }
            `}
          >
            {/* div biar ga ikut container */}
            <div
              css={css`
                ${mq[1]} {
                  padding-top: 4rem;
                }
              `}
            >
              <Image
                src={dataAnime.coverImage.extraLarge}
                width={1050}
                height={1500}
                alt={`Foto ${dataAnime.title.english}`}
                css={css`
                  border-radius: 1rem;
                `}
              />
            </div>
          </div>

          {/* info */}
          <div
            css={css`
              padding: 0 2rem 0 1rem;
              ${mq[1]} {
                padding-top: 3rem;
              }
            `}
          >
            <p
              css={css`
                font-size: 1.875rem;
                line-height: 2.25rem;
                font-weight: 600;
              `}
            >
              {dataAnime.title.english?.toUpperCase()}
            </p>
            <p>{dataAnime.title.native}</p>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                ${maxq[0]} {
                  flex-direction: column;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                `}
              >
                <Rating
                  css={css`
                    padding-top: 1rem;
                    padding-right: 1rem;
                  `}
                  // emptySymbol={<FontAwesomeIcon icon={faStarRegular} />}
                  // fullSymbol={<FontAwesomeIcon icon={faStarSolid} />}
                  initialRating={dataAnime.averageScore / 20}
                  readonly
                />
                <p>{dataAnime.averageScore / 10}</p>
              </div>
              <p>
                {dataAnime.episodes ? `${dataAnime.episodes} EPISODE(S) /` : ""}{" "}
                {dataAnime.duration ? `${dataAnime.duration} MIN. /` : ""}{" "}
                {dataAnime.seasonYear ? `${dataAnime.seasonYear} ` : ""}
              </p>
            </div>
            <div>
              <p
                css={css`
                  font-weight: 700;
                  font-size: 1.4rem;
                `}
              >
                The Genres
              </p>
              <div
                css={css`
                  display: flex;
                `}
              >
                {dataAnime.genres.map((genre, idx) => (
                  <p
                    key={idx}
                    css={css`
                      background-color: #e5e7eb;
                      max-width: fit-content;
                      border-radius: 9999px;
                      padding: 0.2rem 0.5rem;
                      margin-right: 0.5rem;
                      font-size: 0.75rem; /* 12px */
                      line-height: 1rem;
                    `}
                  >
                    {genre}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p
                css={css`
                  font-weight: 700;
                  font-size: 1.4rem;
                `}
              >
                The Synopsis
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: dataAnime.description }}
              />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                ${maxq[0]} {
                  flex-direction: column;
                }
              `}
            >
              <div
                onClick={setShowModalInfo}
                css={css`
                  display: inline-flex;
                  text-align: center;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                `}
              >
                <FontAwesomeIcon
                  css={css`
                    width: 1.2rem;
                    margin-right: 0.8rem;
                  `}
                  icon={faInfoCircle}
                />
                <p
                  css={css`
                    font-weight: 700;
                  `}
                >
                  Collection Info
                </p>
              </div>
              <ButtonClick
                logo={faList}
                text="Add To Collection"
                onClick={setShowModalAdd}
              />
            </div>
          </div>
        </div>
      </div>
      {showModalAdd && (
        <AddItems
          setShowModalAdd={(e) => setShowModalAdd(!showModalAdd)}
          anime={{
            animeID: animeID,
            animeImage: dataAnime.coverImage.large,
            animeName: dataAnime.title.english
              ? dataAnime.title.english
              : dataAnime.title.native,
          }}
        />
      )}
      {showModalInfo && (
        <InfoCollection
          setShowModalInfo={(e) => setShowModalInfo(!showModalInfo)}
          anime={{
            animeID: animeID,
            animeImage: dataAnime.coverImage.large,
            animeName: dataAnime.title.english
              ? dataAnime.title.english
              : dataAnime.title.native,
          }}
        />
      )}
    </div>
  );
}

const GET_ANIME_DETAILS = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        english
        native
      }
      coverImage {
        large
        extraLarge
      }
      description(asHtml: true)
      episodes
      genres
      duration
      averageScore
      seasonYear
    }
  }
`;
