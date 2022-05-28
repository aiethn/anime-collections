import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css } from "@emotion/react";

export const BackButton = ({ pathBack }) => {
  return (
    <div>
      <div
        css={css`
          padding: 1rem;
          @media (min-width: 768px) {
            padding: 2rem;
          }
        `}
      >
        {/* <Link href={pathBack}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            css={css`
              cursor: pointer;
              &:hover {
                color: aqua;
              }
            `}
            size="xl"
          />
        </Link> */}
      </div>
    </div>
  );
};
