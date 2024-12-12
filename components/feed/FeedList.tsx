'use client'

import Feed from "./Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFeeds } from "actions/feedActions";
import { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

export default function FeedList({ params }) {

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = 
    useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["posts", params?.userId],
        queryFn: ({ pageParam }) =>
            getUserFeeds({ userId: params?.userId, page: pageParam, pageSize: 12 }),
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : null,
    });

        const { ref, inView } = useInView({
            threshold: 0,
        });
    
        useEffect(() => {
            if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
                if (data?.pages.some((page) => page.data.length === 0)) return; // 빈 페이지 방어
                fetchNextPage();
            }
        }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);
    
        useEffect(() => {
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