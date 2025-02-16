import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage, authorname }) {
  const previewUrl = featuredimage  
    ? appwriteService.getFilePreview(featuredimage)
    : '/placeholder.jpg'; // Fallback image if no featured image is provided

  return (
    <div className="w-full p-2  ">
      <Link to={`/post/${$id}`} className="block h-full">
        <div className="w-full bg-[#1a1a1a]  rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
          
          <div className="w-full h-48 overflow-hidden text-gray-400"> 
            <img
              src={previewUrl}
              alt={title || 'Post-Image'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 flex flex-col flex-grow">
           
            <h2 className="text-l font-bold text-gray-200 mb-2 line-clamp-2"> 
              {title}
            </h2>
            <p className="text-sm text-gray-200 mb-4">
              By <span className="font-semibold text-gray-200">{authorname}</span>
            </p>

            <div className="mt-auto">
              <button className="w-full bg-gray-400 text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-center">
                Read More
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;