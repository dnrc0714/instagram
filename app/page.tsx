'use client'

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/userActions";
import LogoutButton from "components/logout-button";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Home() {
  const [user, setUser] = useRecoilState(loggedUserState);
    const supabase = createBrowserSupabaseClient();
    useEffect(() => {
        const fetchUser = async () => {
            const {data : {user}, error} = await supabase.auth.getUser();
            if (error) throw error;

            const data = await getUserProfile(user.id);
            setUser(data);
        }

        fetchUser();

        
    }, []);
    
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
    <h1 className="font-bold text-xl">
        Welcome 
        {user?.name}
        !
    </h1> 
    <LogoutButton />
  </main>
  );
}
