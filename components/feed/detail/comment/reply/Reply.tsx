'use client'

export default function Reply({ reply }) {
    return (
        <div className="flex items-start space-x-3">
            <img
                src={reply.profile?.profile_img_url || '../images/simple_profile_img.png'}
                alt={reply.profile.name}
                className="w-6 h-6 rounded-full"
            />
            <div>
                <p className="font-semibold text-gray-800">{reply.profile.name}</p>
                <p className="text-gray-600">{reply.comment}</p>
            </div>
        </div>
    );
}