import Link from "next/link";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export function Menu() {
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (scroll !== window.pageYOffset > 0) {
      setScroll(window.pageYOffset > 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      {" "}
      <div
        css={css`
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-blur: blur(64px);
        `}
      >
        <header
          css={css`
            overflow-x: hidden;
            position: fixed;
            top: 0;
            z-index: 40;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            width: 100%;
            backdrop-blur: blur(8px);
            background-color: white;
            ${scroll && "border-bottom: 1px solid"}
          `}
          className={`overflow-x-hidden ${
            scroll
              ? "border-b-[1px] dark:border-gray-900 border-gray-300/50 bg-white/50"
              : ""
          }  backdrop-blur supports-backdrop-blur:bg-white/95 fixed py-1 w-full top-0 z-40  dark:bg-black/50`}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <nav
              css={css`
                display: flex;
                margin-top: 1rem;
                margin-bottom: 1rem;
                margin-left: 0.5rem;
                display: flex;
                justify-content: center;
                width: 100%;
                cursor: pointer;
              `}
            >
              <Link href="/">
                <a
                  css={css`
                    padding-left: 1rem;
                    padding-right: 1rem;
                    padding-top: 0.75rem;
                    font-weight: 700;
                    line-height: 1.25;
                    max-width: 24rem;
                  `}
                >
                  Anime List
                </a>
              </Link>
              <Link href="/collections">
                <a
                  css={css`
                    padding-left: 1rem;
                    padding-right: 1rem;
                    padding-top: 0.75rem;
                    font-weight: 700;
                    line-height: 1.25;
                    max-width: 24rem;
                  `}
                >
                  Collections List
                </a>
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
