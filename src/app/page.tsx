import { AuthCard } from "@/components/cards/auth-card";
import { HomeRedirect } from "@/components/home-redirect";

export default function Page() {
  return (
    <HomeRedirect>
      <section className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl tracking-wide font-black mb-8">
          Hello, Welcome! 👋
        </h1>
        <AuthCard />
      </section>
    </HomeRedirect>
  );
}
