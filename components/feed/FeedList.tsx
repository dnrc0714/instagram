'use client'

import Feed from "./Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFeed } from "actions/FeedActions";
import { useEffect } from "react";

export default function FeedList() {

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["posts"],
        queryFn: ({ pageParam }) =>
            getUserFeed({ page: pageParam, pageSize: 12 }),
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
        
    }, [inView]);

    return (
        <div className="grid gap-1 md:grid-cols-5 grid-cols-3 w-full h-full">
            {
                <>
                     {data?.pages
                            ?.map((page) => page.data)
                            ?.flat()
                            ?.map((feed) => (
                            <Feed key={feed.id} feedId={feed.id} imgurl={feed?.attachments[0]?.file_url} content={feed.content}/>
                            )
                        )
                    }
                </>
            }
        </div>
    );
}