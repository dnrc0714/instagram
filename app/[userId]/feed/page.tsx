'use client'

import { getUserProfile } from "actions/userActions";
import FeedList from "components/feed/FeedList";
import MyInfo from "components/feed/MyInfo";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "node_modules/recoil";
import { loggedUserState } from "utils/recoil/atoms";


export default function myFeedPage() {
    const loggedUser = useRecoilValue(loggedUserState);
    const params = useParams();
    const { data : profile, refetch : refetchUser, isFetching, isLoading} = useQuery({
        queryKey: ['user_info'], 
        queryFn: () => getUserProfile(params.userId), // 실제 rpc 호출
    });

    if(isLoading) {
        return <Spinner/>;
    }

    return (
        <div className="w-full h-screen flex justify-center ">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-full">
                    <MyInfo user={profile} refetchUser={refetchUser} isFetching={isFetching}/>
                </div>
                {(!profile.secret_tp || profile.id == loggedUser?.id) ? (
                    <FeedList params={params} isLoading={isLoading}/>
                ) : (
                    <p className="flex items-center justify-center">Secret Mode</p>
                )}
                
            </div>
        </div>
    );
}