'use client'

import Slider from "react-slick";
import TimeAgo from "javascript-time-ago";
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-kr");

export default function FeedContent({ feed }){
    // 슬라이드 설정
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,         // 중앙 정렬
    };
    
    return (
        <div>
            <div className="flex items-center gap-2 pb-2">
                <img
                    src={feed?.profile?.profile_img_url || '../images/simple_profile_img.png'}
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{feed?.profile?.name}</span>
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