'use client'

import { Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions";

export default function MyInfo({ loggedInUser }) {

    const {data} = useQuery({
        queryKey: ["profile",],
        queryFn: () => getUserProfile(loggedInUser?.user?.id)
    });

    return (
        <div className="w-full">
            <div className="flex gap-8 justify-center p-2">
                <Avatar
                src={data?.profile_img_url || './images/simple_profile_img.png'}
                alt="Profile"
                variant="circular"
                size="lg"
                className="bg-gray-200"
                ></Avatar>
                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">이름</span>
                        <span>{data?.name}</span>
                    </div>
                    {/* 게시물 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">게시물</span>
                        <span>9999+</span>
                    </div>
                    {/* 팔로우 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로우</span>
                        <span>100K</span>
                    </div>
                    {/* 팔로잉 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로잉</span>
                        <span>10K</span>
                    </div>
                </div>
            </div>
        </div>
    );
}