'use client'

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/userActions";
import LogoutButton from "components/logout-button";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Home() {
  const supabase = createBrowserSupabaseClient();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedUserState);
  useEffect(() => {
    const fetchUser = async () => {
            const {data : {user}, error} = await supabase.auth.getUser();
            const data = await getUserProfile(user.id);
            setLoggedInUser(data);
        }
        fetchUser();
    }, []);
    
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
    <h1 className="font-bold text-xl">
        Welcome 
        {loggedInUser?.name}
        !
    </h1> 
    <LogoutButton />
  </main>
  );
}
