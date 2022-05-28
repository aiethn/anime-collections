import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/Link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const CardCollection = (props) => {
  const allCol = useSelector((state) => state.collections.value);
  const { name, image, linkImage, id, usage } = props;
  const [banner, setBanner] = useState("/banner.jpg");
  const colSelected = allCol.find((col) => col.id === id);

  useEffect(() => {
    if (colSelected?.colItems) {
      if (colSelected.colItems[0]?.animeImage) {
        setBanner(colSelected.colItems[0].animeImage);
      }
    } else {
      setBanner("/banner.jpg");
    }
  }, [colSelected]);

  const handleOnEdit = () => {};

  return (
    <>
      <Link href={linkImage}>
        <div
          css={css`
            cursor: pointer;
            height: 100%;
            overflow: hidden;
            border-radius: 0.375rem;
            &:hover {
              .imgcont {
                filter: none;
              }
              .desc {
                background-color: black;
                color: white;
              }
              .container & {
                transform: scale(1.03);
                -webkit-transition: transform 0.4s ease-in-out;
              }
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex: 1 1 0%;
              flex-direction: column;
              justify-content: center;
              text-align: center;
            `}
          >
            <div
              className="desc"
              css={css`
                filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
              `}
            >
              <Image
                className="imgcont"
                src={usage === "anime" ? image : banner}
                width={250}
                height={400}
                alt={`Foto ${name}`}
              />
            </div>
            <div
              className="desc"
              css={css`
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                // flex: 1 1 0%;
                height: 6rem;
              `}
            >
              <p
                css={css`
                  font-weight: 700;
                  ${name.length < 14 ? "font-size: 1rem" : "font-size: 0.7rem;"}
                `}
              >
                {name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
