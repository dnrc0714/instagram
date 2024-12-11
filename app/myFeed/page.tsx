
import FeedList from "components/feed/FeedList";
import MyInfo from "components/feed/MyInfo";
import { createBrowserSupabaseClient } from "utils/supabase/client";


export default async function myFeedPage() {
    return (
        <div className="w-full h-screen flex justify-center ">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-full">
                    <MyInfo/>
                </div>
                <FeedList/>
            </div>
        </div>
    );
}