import LogoutButton from "components/logout-button";

export const metadata = {
  title: "instagram",
  description: "instagram clone",
};
export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      {/* {"lopun.jh"} */}
    <h1 className="font-bold text-xl">Welcome !</h1> 
    <LogoutButton />
  </main>
  );
}
