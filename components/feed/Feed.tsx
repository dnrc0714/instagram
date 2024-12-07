'use client'

import Link from "next/link";

export default function Feed({
    feed
}) {
    return (
        <div className="col-span-1 relative cursor-pointer aspect-square">
            <img
            src={feed?.attachments[0]?.file_url}
            className="object-cover w-full h-full"
            />
            <Link href={`/myFeed/${feed.id}`}>
            <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
                    <p className="text-xl font-bold text-white"></p>
                </div>
            </Link>
        </div>
    );
}

