import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";  //parses html content that we get from rte
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };
// console.log("Post User ID:", post?.userid);
// console.log("Current User ID:", userData?.$id);
// console.log("Is Author:", isAuthor);
console.log(post);
    return post ? (    
      <div className="py-8 bg-[#cccccc]  min-h-screen">
      <Container>
        {/* Featured Image Section */}
        <div className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl w-full h-auto object-cover md:max-w-[800px] md:max-h-[500px]"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 hover:bg-green-600 transition-colors duration-300" className="mr-3 shadow-md">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500 hover:bg-red-600 transition-colors duration-300" onClick={deletePost} className="shadow-md">
                Delete
              </Button>
            </div>
          )}
        </div>
    
        {/* Title Section */}
        <div className="w-full mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-gray-600 text-lg">By <span className="font-semibold text-gray-800">{post.authorname}</span></p>
        </div>
        {/* Content Section */}
        <div className="browser-css bg-[#cccccc]  p-8 rounded-xl ">
          {parse(post.content)}
        </div>
      </Container>
    </div>
    ) : null;
}