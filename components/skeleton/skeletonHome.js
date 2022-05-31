import ContentLoader from "react-content-loader";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export function SkeletonHome(props) {
  const [windowDimension, detectHW] = useState("");

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  if (windowDimension.winWidth < 641) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <ContentLoader
          speed={2}
          width={640}
          height={500}
          viewBox="0 0 640 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="197" y="47" rx="2" ry="2" width="199" height="14" />
          <rect x="125" y="96" rx="2" ry="2" width="341" height="117" />
          <rect x="128" y="358" rx="2" ry="2" width="341" height="117" />
          <rect x="127" y="227" rx="2" ry="2" width="341" height="117" />
        </ContentLoader>
      </div>
    );
  }
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <ContentLoader
        speed={2}
        width={1300}
        height={1100}
        viewBox="0 0 400 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="110" y="31" rx="2" ry="2" width="140" height="10" />
        <rect x="22" y="70" rx="2" ry="2" width="140" height="94" />
        <rect x="200" y="66" rx="2" ry="2" width="146" height="99" />
        <rect x="21" y="186" rx="2" ry="2" width="140" height="94" />
        <rect x="200" y="183" rx="2" ry="2" width="144" height="99" />
        <rect x="22" y="298" rx="2" ry="2" width="140" height="94" />
        <rect x="203" y="295" rx="2" ry="2" width="143" height="99" />
      </ContentLoader>
    </div>
  );
}
