'use client'

import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Feed() {
    const supabase = createBrowserSupabaseClient();

    return (
        <div className="col-span-1 relative cursor-pointer">
            <img
            src="./images/simple_profile_img.png"
            className="w-30"
            />
        </div>
    );
}