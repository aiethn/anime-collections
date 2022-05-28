import Head from "next/head";
import { Menu } from "./menu";
import { css } from "@emotion/react";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Anime Collections</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Menu />
        <div>
          <main
            css={css`
              padding-top: 4rem;
            `}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
