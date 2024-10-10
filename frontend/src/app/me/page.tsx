import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  console.log(session);
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me");
    return null;
  }

  return (
    <>
      {session.user.id}
      {session.user.name}
      {session.user.email}
      <SignOut />
    </>
  );
}
