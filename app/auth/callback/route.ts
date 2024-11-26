import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createServerSupabaseClient } from "utils/supabase/server";
import axios from "axios";
import { saveUserProfileImage } from "actions/kakaoActions";
import CallBack from "components/auth/callback";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                CallBack(session);
            }
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}