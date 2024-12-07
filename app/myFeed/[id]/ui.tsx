"use client"

export default function UI({ feed }) {
    return (
        <div className="flex flex-col md:flex-row items-center">
            <img
            src={feed.attachments[0].file_url}
            className="w-1/3"
            />
        <div className="md:w-2/3 w-full items-center md:items-start flex flex-col p-6 gap-4">
            <h1 className="text-3xl font-bold">{feed.content}</h1>
            </div>
        </div>
    );
}