import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
   
    

    // async likesmanager({ userid, postid, isliked}) {     /////To implement later
    //     try {
    //         const documentId = slug || ID.unique();
    
    //         console.log("Data being sent to Appwrite:", {
    //            userid,
    //            postid,
    //            isliked
    //         });
    
    //         const response = await this.databases.createDocument(
    //             conf.appwriteDatabaseId,
    //             "67a0bc8b0030db4ce110",
    //             documentId,
    //             {
    //               userid,
    //               postid,
    //               isliked
    //             }
    //         );
    //         console.log("Create response:", response);
    //         return response;
    //     } catch (error) {
    //         console.error("Appwrite service :: likesmanager :: error", error);
    //         throw error;
    //     }
    // }

    async createPost({ title, slug, content, featuredimage, status, userid, authorname }) {
        try {
            const documentId = slug || ID.unique();
    
            console.log("Data being sent to Appwrite:", {
                title,
                content,
                featuredimage,
                status,
                userid,
                authorname
            });
    
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    authorname,
                    userid,
                }
            );
            console.log("Create response:", response);
            return response;
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredimage, status,authorname}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    authorname
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service