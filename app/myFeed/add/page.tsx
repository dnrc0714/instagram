
import AddFeed from "components/feed/AddFeed";
import FeedList from "components/feed/FeedList";
import MyInfo from "components/feed/MyInfo";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function myFeedPage() {
    const supabase = await createServerSupabaseClient();
    const {data: {user}} = await supabase.auth.getUser();
    
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <AddFeed loggedInUser={user}/>
        </div>
    );
}