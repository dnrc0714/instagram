
import AddFeed from "components/feed/AddFeed";
import FeedList from "components/feed/FeedList";
import FollowerList from "components/feed/follow/FollowerList";
import MyInfo from "components/feed/MyInfo";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function FollowerPage() {
    
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <FollowerList/>
        </div>
    );
}