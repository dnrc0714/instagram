'use client'

import { Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDropzone } from "react-dropzone"
import { createBrowserSupabaseClient } from "utils/supabase/client";



export default function AddFeed({ loggedInUser }) {    
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

    const handleSave = () => {
        const formData = new FormData();

        if(images.length == 0) {
            alert("사진을 등록해주세요.");
            return false;
        } else if (!content) {
            alert("설명을 입력해주세요.");
            return false;
        }

        images.forEach(file => {
            formData.append(file.name, file);
        });

        
    };
    

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
            onClick={handleSave}
            className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
            저장
        </button>
        <div className={`flex flex-wrap ${images.length == 0 && "items-center justify-center"}`}>
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
    );
}