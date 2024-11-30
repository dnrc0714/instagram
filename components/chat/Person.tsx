'use client'

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions"
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
import { Avatar } from "@material-tailwind/react";

TimeAgo.addDefaultLocale(ko);

const timeAgo = new TimeAgo("ko-kr");

export default function Person({
    onlineAt,
    isActive = false,
    onChatScreen = false,
    onClick = null,
    name,
    profileImgUrl
}) {
    return (
        <div className={`flex w-full min-w-40 ${onClick && "cursor-pointer"} gap-4 items-center p-4 ${
                !onChatScreen && isActive && "bg-light-blue-50"
            } ${!onChatScreen && !isActive && "bg-gray-50"} 
            ${onChatScreen && "bg-gray-50"}`}
            onClick={onClick}
        >
            <Avatar
            src={profileImgUrl || './images/simple_profile_img.png'}
            alt="Profile"
            variant="circular"
            size="md"
            className="bg-gray-200"
            ></Avatar>
            <div>
                <p className="text-black font-bold text-lg">{name}</p>
                <p className="text-gray-500 text-sm">{timeAgo.format(Date.parse(onlineAt))}</p>
            </div>
        </div>
    )
}