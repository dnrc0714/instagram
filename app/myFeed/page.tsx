
import FeedList from "components/feed/FeedList";
import MyInfo from "components/feed/MyInfo";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function myFeedPage() {
    const supabase = await createServerSupabaseClient();
    const {data : { session }} = await supabase.auth.getSession();

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-full">
                    <MyInfo loggedInUser={session}/>
                </div>
                <FeedList/>
            </div>
        </div>
    );
}