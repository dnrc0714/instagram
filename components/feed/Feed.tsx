'use client'

export default function Feed({
    feed
}) {
    return (
        <div className="col-span-1 relative cursor-pointer aspect-square">
            <img
            src={feed?.attachments[0]?.file_url}
            className="object-cover w-full h-full"
            />
        </div>
    );
}

