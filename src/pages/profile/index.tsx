import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const sessionData = useSession();
  const { data: session, status } = sessionData;
  console.log({ sessionData });

  if (session === null) {
    return (
      <>
        Not signed in <br />
        <Link href="/api/auth/signin">Sign in</Link>
      </>
    );
  }
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
