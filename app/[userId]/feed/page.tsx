'use client'

import FeedList from "components/feed/FeedList";
import MyInfo from "components/feed/MyInfo";
import { useParams } from "next/navigation";

export default async function myFeedPage() {
    const params = useParams();

    return (
        <div className="w-full h-screen flex justify-center ">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-full">
                    <MyInfo/>
                </div>
                <FeedList params={params}/>
            </div>
        </div>
    );
}