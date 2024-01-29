import { Client, Databases, ID, Storage, Query} from "appwrite";
import conf from "../conf/conf"

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async getPost(slug) {
        try {
           return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service :: getPost() ::",error)
            return false
        }
    }
    /* the following is not to get all posts, but to retrieve posts based on a query */

    async getPosts() {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId,
            [Query.equal("status", ["active"])])
        } catch (error) {
            console.log( "Appwrite service :: getPosts() ::" ,error)
            return false
        }

    }

    /* we use ID.unique() for slug */

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status, userId
            })
        } catch (error) {
            console.log( "Appwrite service :: createPost() ::" ,error)
            return false
        }

    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            console.log( "Appwrite service :: updatePost() ::" ,error)
            return false
        }

    }
   
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log( "Appwrite service :: deletePost() ::" ,error)
            return false
        }

    }
    

    // BUILDING STORAGE SERVICE

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log( "Appwrite service :: uploadFile() ::" ,error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFileFile(conf.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log( "Appwrite service :: deleteFile() ::" ,error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href
    }

}


const service = new Service()

export default service