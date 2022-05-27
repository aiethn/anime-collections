import { css } from "@emotion/react";
import { ButtonClick } from "../../components/buttonClick";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BackButton } from "../../components/backButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddCollection } from "../../components/modals/addCollection";

export default function Collections() {
  const dispatch = useDispatch();
  const allCol = useSelector((state) => state.collections.value);
  const [showModalAdd, setShowModalAdd] = useState(false);

  console.log(showModalAdd);

  const handleOnClick = () => {};

  return (
    <div>
      <BackButton pathBack={"/"} />
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
          All Collections
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: end;
            margin-left: 3rem;
            margin-right: 3rem;
          `}
        >
          <ButtonClick
            logo={faPlus}
            text="Add New Collection"
            onClick={setShowModalAdd}
          />
        </div>
      </div>
      {showModalAdd && (
        <AddCollection
          setShowModalAdd={(e) => setShowModalAdd(!showModalAdd)}
        />
      )}
    </div>
  );
}
