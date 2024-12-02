'use client'

import { createBrowserSupabaseClient } from "utils/supabase/client";
import Feed from "./Feed";

export default function FeedList() {
    const supabase = createBrowserSupabaseClient();

    return (
        <div className="grid gap-1 md:grid-cols-5 grid-cols-3 w-full h-full">
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
            <Feed/>
        </div>
    );
}