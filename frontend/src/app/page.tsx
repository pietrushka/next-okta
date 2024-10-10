import { SessionProvider } from "next-auth/react";
import Dashboard from "@/components/auth/Dashboard";

export default function Administrator() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
}
