'use client';
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";

import {  searchUsers } from "actions/userActions";
import { useInfiniteQuery } from "@tanstack/react-query";

import Person from "components/chat/Person";
import { useInView } from "react-intersection-observer";

export default function SearchUserList({search}) {
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["profile", search],
        queryFn: ({ pageParam }) =>
            searchUsers({ search, page: pageParam, pageSize: 16 }),
        getNextPageParam: (lastPage) =>
            lastPage.page ? lastPage.page + 1 : null,
        });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
        fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        console.log(data?.pages)
    });
    
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50">
                {data?.pages
                    ?.map((page) => page.data)
                    ?.flat()
                    ?.map((user) => (
                        <Person
                            key={user.id}
                            onClick={() => {setSelectedUser({
                                id: user.id,
                                name: user.name,
                                profileImgUrl: user?.profile_img_url
                            });}}
                            onlineAt={false}
                            isActive={selectedUser?.id === user.id}
                            onChatScreen={false}
                            userId={user.id}
                            name={user.name}
                            profileImgUrl={user?.profile_img_url}
                            callType={'B'}
                        />
                    ))
                }
        </div>
    );
}