import '@web/styles/globals.css'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Theme><Component {...pageProps} /></Theme>
}
