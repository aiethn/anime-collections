import { css } from "@emotion/react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/Link";
import { useDispatch } from "react-redux";
import { removeCol } from "../features/collections";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const CardCollection = (props) => {
  const dispatch = useDispatch();
  const { name, image, linkImage, id, setShowModalEdit } = props;
  const handleOnEdit = () => {};
  const handleOnRemove = () => {
    dispatch(removeCol(id));
  };
  console.log(id, "ÏDnya");
  return (
    <div
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
                src={image}
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
                flex: 1 1 0%;
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
      {/* <div
        css={css`
          display: flex;
          justify-content: space-between;
          position: relative;
        `}
      >
        <div
          onClick={setShowModalEdit}
          css={css`
            display: flex;
            position: absolute;
            left: 0;
            cursor: pointer;
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
          onClick={(e) => handleOnRemove()}
          css={css`
            display: flex;
            position: absolute;
            right: 0;
            cursor: pointer;
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
      </div> */}
    </div>
  );
};
