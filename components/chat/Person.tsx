'use client'

import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
import { Avatar } from "@material-tailwind/react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-kr");

export default function Person({
    onlineAt,
    isActive = false,
    onChatScreen = false,
    onClick = null,
    userId,
    name,
    profileImgUrl,
    callType
}) {
    const router = useRouter();

    return (
        <div className={`flex w-full min-w-40 ${onClick && "cursor-pointer"} gap-4 items-center p-4 ${
                !onChatScreen && isActive && "bg-light-blue-50"
            } ${!onChatScreen && !isActive && "bg-gray-50"} 
            ${onChatScreen && "bg-gray-50"}
            ${callType == 'B' && "flex items-center justify-between"}`}
            onClick={onClick}
        >
            <Avatar
            src={profileImgUrl || './images/simple_profile_img.png'}
            alt="Profile"
            variant="circular"
            size="md"
            className="bg-gray-200"
            ></Avatar>
                <p className="text-black font-bold text-lg">{name}</p>
                {callType == 'A' ? (
                    <p className="text-gray-500 text-sm">{onlineAt && timeAgo.format(Date.parse(onlineAt))}</p>
                ) : (
                        <button
                            onClick={() => {router.push(`${userId}/feed`)}}
                            className="text-gray-500 hover:text-blue-500"
                            title="완료"
                        >
                            <FiArrowRight size={16}/>
                        </button>
                )}
        </div>
    )
}