import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import useLongPress from "../middleware/longPress";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export function Card(props) {
  const {
    animeID,
    title,
    titleNative,
    image,
    isSelected,
    bulkAdd,
    animeSelected,
  } = props;
  const animeData = {
    animeID: animeID.toString(),
    animeImage: image,
    animeName: title ? title : titleNative,
  };
  const onLongPress = () => {
    isSelected(animeData);
  };
  const onClick = () => {
    if (bulkAdd) {
      isSelected(animeData);
    }
  };
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  return (
    <div
      css={css`
        padding: 1rem;
        max-width: 34rem;

        ${mq[1]} {
          width: 50%;
        }

        ${maxq[1]} {
          width: 50%;
          min-width: 100%;
        }
      `}
      {...longPressEvent}
    >
      <div
        css={css`d
          height: 100%;
          overflow: hidden;
          border: 2px solid rgb(229 231 235);
          border-radius: 0.375rem;
          ${
            bulkAdd &&
            animeSelected.find(
              (anime) => anime.animeID === animeID.toString()
            ) &&
            "background-color: rgba(101, 198, 187, 0.5);"
          }
          
          &:hover {
            border-color: rgb(45 212 191);
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1 1 0%;
            padding: 1rem;
          `}
        >
          <div>
            <Link href={`/anime-details/${animeID}`}>
              <Image
                src={image}
                width={140}
                height={200}
                alt={`Foto ${title}`}
                css={css`
                  cursor: pointer;
                `}
              />
            </Link>
          </div>
          <div
            css={css`
              padding-left: 0.5rem;
              display: flex;
              flex-direction: column;
              flex: 1 1 0%;
              justify-content: space-between;
            `}
          >
            <p
              css={css`
                font-weight: 700;
                text-align: center;
                // font-size: 1.2rem;
                ${title?.length > 20 || titleNative?.length > 20
                  ? "font-size: 1rem"
                  : "font-size: 1.2rem"}
              `}
            >
              {title ? title : titleNative}
            </p>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
              `}
            >
              <Link href={`/anime-details/${animeID}`}>
                <div
                  css={css`
                    cursor: pointer;
                    &:hover {
                      color: rgb(45 212 191);
                    }
                  `}
                >
                  See More &gt;
                </div>
              </Link>
              {/* <div>Check</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
