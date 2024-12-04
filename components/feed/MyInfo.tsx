'use client'

import { Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

export default function MyInfo() {
    const loggedUser = useRecoilValue(loggedUserState);

    return (
        <div className="w-full">
            <div className="flex gap-8 justify-center p-2">
                <Avatar
                src={loggedUser?.profile_img_url || './images/simple_profile_img.png'}
                alt="Profile"
                variant="circular"
                size="lg"
                className="bg-gray-200"
                ></Avatar>
                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">이름</span>
                        <span>{loggedUser?.name}</span>
                    </div>
                    {/* 게시물 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">게시물</span>
                        <span>{loggedUser?.post_count}</span>
                    </div>
                    {/* 팔로우 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로우</span>
                        <span>{loggedUser?.follow_count}</span>
                    </div>
                    {/* 팔로잉 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로잉</span>
                        <span>{loggedUser?.following_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}