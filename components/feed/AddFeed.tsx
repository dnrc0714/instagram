'use client'

import { Spinner } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useDropzone } from "react-dropzone"
import { createBrowserSupabaseClient } from "utils/supabase/client";

export async function handleSavePost({ content, images }) {
    let cnt = 1;
    const supabase = createBrowserSupabaseClient();

    if(images.length == 0) {
        alert("사진을 등록해주세요.");
        return false;
    } else if (!content) {
        alert("설명을 입력해주세요.");
        return false;
    }

    // 사용자 세션 확인
    const { data: { session }, error: sessionError} = await supabase.auth.getSession();

    if (sessionError || !session) {
        throw new Error('User is not authenticated');
    }

    const userId = session.user.id;

    try {
        // 1. `posts` 테이블에 게시글 저장
        const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([{ content }])
        .select('id')
        .single();

        if (postError) {
        throw new Error(postError.message);
        }

        const postId = post.id;

        // 2. 이미지를 Supabase 스토리지에 업로드하고 `attachments` 테이블에 저장
        for (const image of images) {
            const fileName = `${Date.now()}-${image.name}`;
            const filePath = `${userId}/${postId}/${fileName}`;

            // 2.1 스토리지에 이미지 업로드
            const { error: storageError } = await supabase.storage
                .from('dropbox')
                .upload(filePath, image);

            if (storageError) {
                throw new Error(`Failed to upload image: ${storageError.message}`);
            }

            // 2.2 업로드한 이미지의 URL 생성
            const { data: urlData } = supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET).getPublicUrl(filePath);

            if (!urlData?.publicUrl) {
                throw new Error('Failed to generate public URL for image');
            }

            const imageUrl = urlData.publicUrl;

            // 2.3 `attachments` 테이블에 이미지 URL 저장
            const { error: attachmentError } = await supabase.from('attachments').insert([
                {
                post_id: postId,
                file_url: imageUrl,
                file_name: image.name,
                post_seq: cnt
                },
            ]);

            
            if (attachmentError) {
                throw new Error(`Failed to save attachment: ${attachmentError.message}`);
            }
            cnt++;

        }

        return { success: true, postId};

    } catch (error) {
        console.error('Error saving post:', error);
        throw error;
    }
    }

export default function AddFeed({ loggedInUser }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [images, setImages] = useState<File[]>([]);
    const [content, setContent] = useState('');
    

     // 파일 업로드 핸들러
    const handleImageUpload = (acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > 10) {
            alert('최대 10개의 이미지만 업로드할 수 있습니다.');
            return;
        }
        setImages([...images, ...acceptedFiles]);
    };

    const savePostMutation = useMutation({
        mutationFn: () => handleSavePost({content, images}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] }); // 캐시 무효화'
            setImages([]); // 이미지 배열 초기화
            setContent(""); // 설명 초기화
            alert('저장되었습니다. myFeed로 이동합니다.');
            router.push('/myFeed');
        },
        onError: (error) => {
            console.error("Save failed:", error); // 에러 처리
        },
    });

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles),
        multiple: true, // 여러 개의 파일을 동시에 드래그할 수 있습니다. (true로 설정 시)
        accept: 'image/*',
        
    });

    return (
    <div className="flex flex-wrap flex-col gap-10 p-2">
        {/* 저장 버튼 */}
        <button
            onClick={() => savePostMutation.mutate()}
            className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-md ${
                savePostMutation.isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                }`}
        >
            저장
        </button>
        {savePostMutation.isPending 
            ? (<Spinner/>) 
            : (
                <div className="flex flex-wrap flex-col gap-10 p-2">
                    {/* 이미지 목록 */}
                    <div className={`flex flex-wrap ${images.length === 0 ? "items-center justify-center" : ""}`}>
                        {images.map((image, index) => (
                            <div className="relative w-36 h-36 p-2" key={index}>
                                <img  
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg" />
                                {images.length <= 10 && (
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* 마지막에 + 버튼 드래그 앤 드롭 영역 */}
                        {images.length < 10 && (
                            <div
                                {...getRootProps()}
                                className="w-32 h-32 border-2 mt-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg cursor-pointer"
                            >
                                <input {...getInputProps()} className="hidden" />
                                <p className="text-blue-500 text-3xl">+</p>
                            </div>
                        )}
                    </div>

                    {/* Description 입력 섹션 */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="설명을 입력하세요."
                        className="w-full min-w-80 h-36 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
            )
        }
      {/* Description 입력 섹션 */}
        


    </div>
    );
}