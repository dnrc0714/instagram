'use client'

import { Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/userActions";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

export default function MyInfo() {
    const params = useParams();
    const { data } = useQuery({
        queryKey: ['user_info'], // 쿼리 키와 파라미터로 캐싱 관리
        queryFn: () => getUserProfile(params.userId), // 실제 rpc 호출
    });
    
    return (
        <div className="w-full">
            <div className="flex gap-8 justify-center p-2">
                <Avatar
                src={data?.profile_img_url || '../images/simple_profile_img.png'}
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
                        <span>{data?.post_count}</span>
                    </div>
                    {/* 팔로우 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로우</span>
                        <span>{data?.follow_count}</span>
                    </div>
                    {/* 팔로잉 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로잉</span>
                        <span>{data?.following_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}