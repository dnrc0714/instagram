import { getFeed } from "actions/feedActions";
import UI from "./ui";
import Sidebar from "components/sidebar";

export default async function FeedDetail({ params }) { 
    const feed = await getFeed(params.id);

    return (
        <main className="w-full h-screen pt-10">
            {feed ? <UI feed={feed} /> : <div>Feed does not exists</div>}
        </main>
    );
}