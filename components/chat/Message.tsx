'use client'

export default function Message({
    isFromMe,
    message
}) {
    return (
        <div className={`w-fit p-3  rounded-lg ${
            isFromMe ? "ml-auto bg-light-blue-300 text-white" 
                    : "mr-auto justify-self-start bg-gray-100 text-black"
        }`}
        >
            <p>{message}</p>
        </div>
    );
}