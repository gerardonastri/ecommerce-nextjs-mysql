import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth"); // reindirizzamento server-side
  }

  // Pass the session data as serializable props to the client component
  return <ProfileClient user={session.user} />;
}
