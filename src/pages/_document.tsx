import { Html, Head, Main, NextScript } from "next/document";
import Header from "@web/components/Header";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <Header /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
