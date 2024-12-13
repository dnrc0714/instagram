'use client';
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";
import { useParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import Person from "components/chat/Person";
import { useInView } from "react-intersection-observer";
import { getFollwerList, getFollwingList } from "actions/followActions";

export default function FollowerList() {
    const param = useParams();
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["follows", param.userId],
        queryFn: ({ pageParam }) =>
            getFollwerList({ userId:param.userId, page: pageParam, pageSize: 16 }),
        getNextPageParam: (lastPage) =>
            lastPage.page ? lastPage.page + 1 : null,
        });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        data?.pages
                    ?.map((page) => page.data)
                    ?.flat()
                    ?.map((user) => {console.log(user.profile)});
        if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
        fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);
    
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50">
                {data?.pages
                    ?.map((page) => page.data)
                    ?.flat()
                    ?.map((user) => (
                        <Person
                            key={user.profile?.id}
                            onClick={() => {setSelectedUser({
                                id: user.profile.id,
                                name: user.profile.name,
                                profileImgUrl: user.profile?.profile_img_url
                            });}}
                            onlineAt={false}
                            isActive={selectedUser?.id === user.profile.id}
                            onChatScreen={false}
                            userId={user.profile.id}
                            name={user.profile.name}
                            profileImgUrl={user.profile?.profile_img_url}
                            callType={'C'}
                        />
                    ))
                }
        </div>
    );
}