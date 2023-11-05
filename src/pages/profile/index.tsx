import Layout from "@web/components/Layout";
import SignInPage from "@web/components/SignInPage";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const sessionData = useSession();
  const { data: session, status } = sessionData;
  console.log({ sessionData });

  if (session === null) {
    return (
      <>
        <SignInPage />
      </>
    );
  }
  return (
    <Layout>
      <div>{JSON.stringify(session)}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  );
}
