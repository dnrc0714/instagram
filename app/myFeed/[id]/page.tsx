import { getFeed } from "actions/FeedActions";
import UI from "./ui";

export default async function FeedDetail({ params }) { 
    const feed = await getFeed(params.id);
    return (
        <main className="py-16 flex items-center bg-blue-50 w-full absolute top-0 bottom-0 left-0 right-0">
            {feed ? <UI feed={feed} /> : <div>Feed does not exists</div>}
        </main>
    );
}