'use client'

import Slider from "react-slick";
import TimeAgo from "javascript-time-ago";
import ko from 'javascript-time-ago/locale/ko';
import { useState } from "react";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteFile } from "actions/storageActions";
import { deleteFeed } from "actions/feedActions";
import Link from "node_modules/next/link";

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-kr");

export default function FeedContent({ feed }){
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 더보기 메뉴 상태
    const router = useRouter();

    // 슬라이드 설정
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
    };

    // 더보기 버튼 클릭 시 메뉴 열기/닫기
    const handleMoreClick = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const deleteFeedMutation = useMutation({
        mutationFn: async () => {
            const filePath = `${feed.creator_id}/${feed.id}`;
            await deleteFeed(feed.id);
            await deleteFile(filePath);
        },
        onSuccess: () => {
            alert("게시글이 삭제되었습니다.");
            router.push('/myFeed');
        }
    })

    const handleEdit = () => {
        // 수정 로직
        console.log("수정 페이지로 이동합니다.");
    };
    
    return (
        <div>
            <div className="flex items-center gap-2 pb-2 justify-between">
                <Link href={`/${feed?.creator_id}/feed`}>
                <div className="flex items-center gap-2">
                    <img
                        src={feed?.profile?.profile_img_url || '/images/simple_profile_img.png'}
                        alt="creator"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold">{feed?.profile?.name}</span>
                </div>
                </Link>
                <div className="relative">
                     {/* 더보기 버튼 */}
                <button onClick={handleMoreClick} className="text-gray-500 hover:text-black">
                    <FaEllipsisV size={18} />
                </button>

                {/* 수정 및 삭제 버튼 메뉴 */}
                {isMenuOpen && (
                    <div className="absolute -top-2 -right-36 mt-2 w-32 bg-white shadow-lg rounded-md border">
                        <button
                            onClick={handleEdit}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                            >
                            <FaEdit className="inline mr-2" />
                            수정
                        </button>
                        <button
                            onClick={() => deleteFeedMutation.mutate()}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                            <FaTrash className="inline mr-2" />
                            삭제
                        </button>
                    </div>
                )}
                </div>
            </div>

            <div className="mx-auto w-full max-w-[300px]">
                <Slider
                    {...settings}
                >
                    {feed?.attachments.map((attachment) => (
                        <div key={attachment.post_seq} className="flex justify-center">
                            <img
                                src={attachment.file_url}
                                alt={`Image ${attachment.post_seq}`}
                                className="w-full h-[300px] object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="mt-1">
                <div className="flex items-center justify-end">
                    <span className="text-gray-500">{timeAgo.format(Date.parse(feed.created_at))}</span>
                </div>

                <p className="mt-2 text-lg">{feed.content}</p>
            </div>
        </div>
    );
}