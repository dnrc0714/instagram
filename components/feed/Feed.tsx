'use client'

import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Feed({
    feedId = null,
    imgurl,
    content,
    createdAt = null
}) {
    const supabase = createBrowserSupabaseClient();

    return (
        <div className="col-span-1 relative cursor-pointer">
            <img
            src={imgurl}
            className="w-60 h-60 object-co"
            />
        </div>
    );
}