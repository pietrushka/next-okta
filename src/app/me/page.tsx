import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me");
    return null;
  }

  return (
    <>
      {session.user.id}
      {session.user.name}
      {session.user.email}
    </>
  );
}
