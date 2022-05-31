import ContentLoader from "react-content-loader";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export function SkeletonAnime(props) {
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
          <rect x="124" y="96" rx="2" ry="2" width="341" height="117" />
          <rect x="122" y="267" rx="2" ry="2" width="344" height="9" />
          <rect x="124" y="227" rx="2" ry="2" width="342" height="28" />
          <rect x="123" y="283" rx="2" ry="2" width="344" height="9" />
          <rect x="124" y="301" rx="2" ry="2" width="344" height="9" />
          <rect x="122" y="319" rx="2" ry="2" width="344" height="9" />
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
        margin-left: 35rem;
      `}
    >
      <ContentLoader
        speed={2}
        width={1500}
        height={800}
        viewBox="0 0 1000 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="306" y="86" rx="2" ry="2" width="199" height="14" />
        <rect x="307" y="113" rx="2" ry="2" width="136" height="10" />
        <rect x="68" y="82" rx="2" ry="2" width="192" height="255" />
        <rect x="307" y="138" rx="2" ry="2" width="85" height="23" />
        <rect x="424" y="137" rx="2" ry="2" width="85" height="23" />
        <rect x="306" y="178" rx="2" ry="2" width="207" height="15" />
        <rect x="431" y="315" rx="2" ry="2" width="78" height="21" />
        <rect x="305" y="208" rx="2" ry="2" width="128" height="9" />
        <rect x="303" y="230" rx="2" ry="2" width="170" height="12" />
        <rect x="305" y="255" rx="2" ry="2" width="207" height="15" />
        <rect x="303" y="286" rx="2" ry="2" width="128" height="9" />
        <rect x="306" y="318" rx="2" ry="2" width="60" height="16" />
      </ContentLoader>
    </div>
  );
}
