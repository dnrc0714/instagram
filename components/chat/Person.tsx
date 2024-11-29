'use client'

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions"
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

TimeAgo.addDefaultLocale(ko);

const timeAgo = new TimeAgo("ko-kr");

export default function Person({
    onlineAt,
    isActive = false,
    onChatScreen = false,
    onClick = null,
}) {
    const [userId, setUserId] = useState<string | null>(null);
    const supabase = createBrowserSupabaseClient();
    useEffect(() => {
    const fetchUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();

        setUserId(user?.user?.id);
    };
    fetchUser();
    }, []);

    const { data } =
        useQuery({
            queryKey: ['profile', userId], // 캐싱 및 재사용을 위한 queryKey
            queryFn: () => getUserProfile(userId), // 데이터를 가져오는 함수
            refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
        });
    return (
        <div className={`flex w-full min-w-40 ${onClick && "cursor-pointer"} gap-4 items-center p-4 ${
                !onChatScreen && isActive && "bg-light-blue-50"
            } ${!onChatScreen && !isActive && "bg-gray-50"} 
            ${onChatScreen && "bg-gray-50"}`}
            onClick={onClick}
        >
            <img
                src={data?.profile_img_url}
                alt={data?.name}
                className="w-10 h-10 rounded-full"
            />
            <div>
                <p className="text-black font-bold text-lg">{data?.name}</p>
                <p className="text-gray-500 text-sm">{timeAgo.format(Date.parse(onlineAt))}</p>
            </div>
        </div>
    )
}