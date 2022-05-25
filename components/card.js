import { jsx, css } from "@emotion/react";
import Image from "next/image";

const breakpoints = [640, 768, 1024, 1280, 1536];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export function Card(props) {
  const { key, name, nameNative, description, gender, image } = props;
  return (
    <div
      css={css`
        padding: 1rem;
        max-width: 34rem;
        ${mq[1]} {
          width: 50%;
        }
      `}
    >
      <div
        css={css`
          padding: 1.5rem;
          height: 100%;
          overflow: hidden;
          border-width: 2px;
          border-color: rgb(229 231 235);
          border-radius: 0.375rem;
          &:hover {
            border-color: rgb(45 212 191);
          }
          //   background: black;
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1 1 0%;
          `}
        >
          <div>
            <Image src={image} width={140} height={200} alt={`Foto ${name}`} />
          </div>
          <div
            css={css`
              padding: 1.5rem;
              display: flex;
              flex-direction: column;
              flex: 1 1 0%;
            `}
          >
            <p>{name}</p>
            <p>{nameNative}</p>
            <p>{gender}</p>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
          {/* <h4 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-black dark:text-white">
            Judul
          </h4>
          <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">
            Desc
          </p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 dark:bg-black dark:text-gray-400 dark:border-2 dark:border-gray-400">
            Tech
          </span> */}
        </div>
      </div>
    </div>
  );
}
