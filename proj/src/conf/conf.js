const conf = {
   appwriteURL : String(import.meta.env.VITE_APPWRITE_URL), //we will always get string value from here for sure it is a good practise 
   appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
   appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
   appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
   appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;