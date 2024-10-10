"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  // @ts-expect-error asd
  const access_token = session?.access_token;
  console.log("access_token", access_token);

  useEffect(() => {
    if (session) {
      fetch("http://localhost:4000", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [access_token]);

  return null;
}
