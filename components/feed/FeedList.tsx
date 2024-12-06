'use client'

import Feed from "./Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFeeds } from "actions/feedActions";
import { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

export default function FeedList() {
    const loggedInUser = useRecoilValue(loggedUserState);

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = 
    useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["posts", loggedInUser?.id],
        queryFn: ({ pageParam }) =>
            getUserFeeds({ userId: loggedInUser?.id, page: pageParam, pageSize: 8 }),
        getNextPageParam: (lastPage) =>
            lastPage.page ? lastPage.page + 1 : null,    
    });

        const { ref, inView } = useInView({
            threshold: 1,
        });
    
        useEffect(() => {
            if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
                // if (data?.pages.some((page) => page.data.length === 0)) return; // 빈 페이지 방어
                fetchNextPage();
            }
        }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);
    
        useEffect(() => {
            console.log(inView);
        }, [inView]);

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-3">
            {
                <>
                    {data?.pages
                    ?.map((page) => page.data)
                    ?.flat()
                    ?.map((feed) => (
                        <Feed
                            key={feed.id}
                            feed={feed}
                        />
                    ))}
                    <div ref={ref}></div>
                </>
            
            }
            {(isFetching || isFetchingNextPage) && <Spinner />}
        </div>
    );
}