import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const maxq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export function Card(props) {
  const { animeID, title, titleNative, image } = props;
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
    >
      <Link href={`/anime-details/${animeID}`}>
        <div
          css={css`
            cursor: pointer;
            padding: 1.5rem;
            height: 100%;
            overflow: hidden;
            border: 2px solid rgb(229 231 235);
            border-radius: 0.375rem;
            &:hover {
              border-color: rgb(45 212 191);
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex: 1 1 0%;
            `}
          >
            <div>
              <Image
                src={image}
                width={140}
                height={200}
                alt={`Foto ${name}`}
              />
            </div>
            <div
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
                `}
              >
                {title ? title : titleNative}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
