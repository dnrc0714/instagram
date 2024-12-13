'use client'

import { Spinner } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { followingChk, followChk } from "actions/followActions";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import FollowButton from "./FollowButton";
import SecretButton from "./SecretButton";
import Link from "node_modules/next/link";

export default function MyInfo({ user, refetchUser, isFetching }) {
    const loggedUser = useRecoilValue(loggedUserState);
    const params = useParams();

    
    const { data: followingData, refetch : refetchFollow} = useQuery({
        queryKey: ['follows', user?.id], // 사용자 ID를 포함하여 키 관리
        queryFn: () => followingChk(params.userId), // 서버에서 팔로우 상태 확인
        enabled: Boolean(params.userId), // params.userId가 존재할 때만 실행
        initialData: false, // 기본값 설정 (팔로우 안한 상태)
    });

    const { data: followData } = useQuery({
        queryKey: ['follows', user?.id], // 사용자 ID를 포함하여 키 관리
        queryFn: () => followChk(params.userId), // 서버에서 팔로우 상태 확인
        enabled: Boolean(params.userId), // params.userId가 존재할 때만 실행
        initialData: false, // 기본값 설정 (팔로우 안한 상태)
    });

    
    if(isFetching) {
        return <Spinner/>;
    }

    return (
        <div className="w-full felx fle-col">
            <div className="flex gap-8 justify-center p-2">
                <Avatar
                src={user?.profile_img_url || '../images/simple_profile_img.png'}
                alt="Profile"
                variant="circular"
                size="lg"
                className="bg-gray-200"
                ></Avatar>
                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">이름</span>
                        <span>{user?.name}</span>
                    </div>
                    {/* 게시물 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">게시물</span>
                        <span>{user?.post_count}</span>
                    </div>
                    {/* 팔로우 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로우</span>
                        {(user.id == loggedUser.id) || (followingData && followData) ? (
                            <Link href={`follower`}><span>{user?.following_count}</span></Link>
                        ) : (
                            <span>{user?.following_count}</span>
                        )}
                    </div>
                    {/* 팔로잉 수 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-md text-gray-700">팔로잉</span>
                        {(user.id == loggedUser.id) || (followingData && followData) ? (
                        <Link href={`following`}><span>{user?.follow_count}</span></Link>
                        ) : (
                            <span>{user?.follow_count}</span>
                        )}
                    </div>
                </div>
            </div>
            {loggedUser?.id != params.userId ? (
                <FollowButton params={params} 
                            refetchFollow={refetchFollow} 
                            refetchUser={refetchUser} 
                            followingData={followingData}
                />
            ) : (
                <SecretButton user={user}
                            refetchUser={refetchUser}
                />
            )}
        </div>
    );
}