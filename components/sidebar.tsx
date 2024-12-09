'use client'

import { Add, Home, Logout, Person, Search, Send } from "@mui/icons-material";
import Link from "next/link";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Sidebar(){
    const supabase = createBrowserSupabaseClient();

    return (
        <aside className="h-screen p-7 border-r border-gray-300 flex flex-col justify-between w-fit fixed top-0 left-0">
            <div className="flex flex-col gap-6">
                <Link href="/">
                    <Home className="text-2xl mb-10"/>
                </Link>
                <Link href="/myFeed">
                    <Person className="text-2xl"/>
                </Link>
                <Link href="/myFeed/add">
                    <Add className="text-2xl"/>
                </Link>
                <Link href="/discover">
                    <Search className="text-2xl"/>
                </Link>
                <Link href="/chat">
                    <Send className="text-2xl"/>
                </Link>
            </div>

            <div>
                <button onClick={async () => {
                supabase.auth.signOut();
                
                }}>
                    <Logout className="text-2xl text-deep-purple-200"/>
                </button>
            </div>
        </aside>
    );
}