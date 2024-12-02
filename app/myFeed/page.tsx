import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions";
import Person from "components/chat/Person";
import FeedList from "components/feed/FeedList";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function myFeedPage() {
    const supabase = await createServerSupabaseClient();
    const {data : { session }} = await supabase.auth.getSession();

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col">
                {/* <Person
                    key={data.id}
                    onlineAt={true}
                    onChatScreen={false}
                    userId={data.id}
                    name={data.name}
                    profileImgUrl={data?.profile_img_url}
                /> */}
                <FeedList/>
            </div>
        </div>
    );
}