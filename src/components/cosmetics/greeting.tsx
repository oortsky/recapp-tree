"use client";

import { useAuth } from "@/hooks/use-auth";

export function Greeting() {
  const current = new Date().getHours();
  const { user } = useAuth();

  const name = user?.name?.split(" ");
  const firstName = name?.[0] || "Guest";

  let greeting;

  if (current >= 5 && current < 12) {
    greeting = `Hi ${firstName}, Good Morning. ☀️`;
  } else if (current >= 12 && current < 15) {
    greeting = `Hi ${firstName}, Good Afternoon. 🌤️`;
  } else if (current >= 15 && current < 18) {
    greeting = `Hi ${firstName}, Good Evening. 🌅`;
  } else {
    greeting = `Hi ${firstName}, Good Night. 🌙`;
  }

  return <span className="text-xl text-center font-extrabold">{greeting}</span>;
}
