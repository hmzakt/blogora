import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            featuredimage: post?.featuredimage || "",
            authorname: post?.authorname || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false); // Loading state
   

    const submit = async (data) => {
        setIsLoading(true); // Set loading to true when submission starts
        try {
            console.log("Submit data:", data);

            let fileId = post?.featuredimage || null;

            // Upload the new featured image if provided
            if (data.featuredimage && data.featuredimage.length > 0) {
                const file = data.featuredimage[0];
                const uploadedFile = await appwriteService.uploadFile(file); // Upload the file
                fileId = uploadedFile.$id; // Get the file ID
            }

            let dbPost;

            if (post) {
                console.log("Updating post:", post.$id);
                dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    featuredimage: fileId, // Use the file ID
                    status: data.status,
                    authorname: data.authorname,
                });
            } else {
                console.log("Creating new post");
                dbPost = await appwriteService.createPost({
                    title: data.title,
                    content: data.content,
                    featuredimage: fileId, // Use the file ID
                    status: data.status,
                    userid: userData.$id,
                    authorname: data.authorname,
                });
            }

            console.log("Operation result:", dbPost);
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                console.error("No response from operation");
            }
        } catch (error) {
            console.error("Error in submit:", error);
        } finally {
            setIsLoading(false); // Set loading to false when submission ends
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="This will appear in url"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Author Name :"
                    placeholder="Name"
                    className="mb-4"
                    {...register("authorname", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredimage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full flex items-center justify-center"
                    disabled={isLoading} // Disable the button when loading
                >
                    {isLoading ? (
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="40" height="30">
                        <circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="40" cy="100">
                          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                        </circle>
                        <circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="100" cy="100">
                          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                        </circle>
                        <circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="160" cy="100">
                          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                        </circle>
                      </svg>
                    ) : (
                        post ? "Update" : "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
}