import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonClick = (props) => {
  const { logo, text, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        background-color: white;
        cursor: pointer;
        display: inline-flex;
        padding: 0.625rem 1rem;
        color: black;
        font-size: 1rem;
        line-height: 1.25rem;
        font-weight: 500;
        text-align: center;
        align-items: center;
        border-radius: 0.5rem;
        border: 1px solid black;
        transform: translateY(0.2rem);
        transition-duration: 0.5s;
        &:hover {
          filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
          color: white;
          background-color: black;
          transform: translateY(-0.2rem);
          transition-duration: 0.5s;
        }
      `}
    >
      <FontAwesomeIcon
        icon={logo}
        css={css`
          margin-right: 1rem;
          margin-left: -0.25rem;
          width: 1rem;
          height: 1rem;
          &:hover {
            color: white;
          }
        `}
      />
      <p>{text}</p>
    </button>
  );
};
