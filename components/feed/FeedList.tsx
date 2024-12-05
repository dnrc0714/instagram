'use client'

import Feed from "./Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFeed } from "actions/FeedActions";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

export default function FeedList() {
    const [hasFetched, setHasFetched] = useState(false);
    const loggedInUser = useRecoilValue(loggedUserState);

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => getUserFeed({ userId: loggedInUser?.id, page: pageParam, pageSize: 6 }),
        initialPageParam: 1, // 첫 페이지는 1로 설정
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        },
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
            console.log(inView);
        }, [inView]);

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-3">
            {isFetching ? (
                <Spinner />
            ) : (
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
            )}
        </div>
    );
}