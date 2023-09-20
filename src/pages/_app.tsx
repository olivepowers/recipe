import "@web/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Theme>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Theme>
  );
}
