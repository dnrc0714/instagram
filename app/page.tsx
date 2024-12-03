import LogoutButton from "components/logout-button";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {data: {user : {user_metadata}}} = await supabase.auth.getUser();

  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
    <h1 className="font-bold text-xl">Welcome {user_metadata?.name}!</h1> 
    <LogoutButton />
  </main>
  );
}
