import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class PostService {

    client = new Client;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({ Title, Featureimage, Category, status, Content, userId, PostId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId,
                {
                    Title,
                    Featureimage,
                    Category,
                    status,
                    Content,
                    userId,
                    PostId
                }
            )
        } catch (error) {
            console.error("Appwrite serive :: createPost :: error", error);
            return false;
        }
    }
    async updatePost(PostId, { Title, Featureimage, Category, status, Content, View }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId,
                {
                    Title,
                    Featureimage,
                    Category,
                    status,
                    Content,
                    View
                }
            )

        } catch (error) {
            console.error("Appwrite serive :: updatePost :: error", error);
        }
    }
    async getPost(PostId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId
            )
        } catch (error) {
            console.error("Appwrite serive :: getPost :: error", error);
        }
    }
    async delatePost(PostId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId
            )
        } catch (error) {
            console.error("Appwrite serive :: delatePost :: error", error);
        }
    }
    async getAllPost(queries = [Query.equal("status", "Active")]) {
        try {
            const totalCount = await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                queries
            )
            if (totalCount.documents.length > 9) {
                console.log("call")
                const totalPosts = totalCount.documents.length;

                // Generate random indices to retrieve 9 random posts
                const randomIndices = generateRandomIndices(totalPosts, 9);

                // Fetch 9 random posts from the database using the random indices
                // Promisall takes an array of promises and returns a single promise
                const randomPosts = await Promise.all(randomIndices.map(async (index) => {
                    const post = await this.databases.getDocument(
                        conf.appwriteDatabaaseId,
                        conf.appwriteCollectionId,
                        totalCount.documents[index].$id // Assuming $id is the document ID field
                    );
                    return post;
                }));
                return randomPosts;
            }else if(totalCount.documents.length > 0 && totalCount.documents.length <= 9 ){
                return totalCount.documents;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Appwrite serive :: getAllPost :: error", error);
        }
    }

    async getFiterPost({ userId, Category, Status = "Active", offset }) {
        let queryArray = [];
        if (userId) {
            queryArray.push(Query.equal("userId", userId))
        }
        if (Category !== "Posts" && Category) {
            queryArray.push(Query.equal("Category", Category));
        }
        if (Status === "All") {
            queryArray.push(Query.equal("status", "Active"));
        } else {
            queryArray.push(Query.equal("status", Status));
        }
        if (offset !== undefined) {
            queryArray.push(
                Query.orderDesc('$createdAt'),
                Query.orderAsc('Title'),
                Query.limit(15),
                Query.offset(offset),
            )
        }
        console.log("queryArray",queryArray)
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                queryArray,
            )
        } catch (error) {
            console.error("Appwrite serive :: getUserPost :: error", error);
        }
    }

    // ====================== post like =======================

    async createLike(userId, postId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                ID.unique(),
                {
                    userId,
                    postId,
                }
            )
        } catch (error) {
            console.error("Appwrite serive :: createLike :: error", error);
            return false;
        }
    }

    async removeLike(LikeID) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                LikeID
            )
        } catch (error) {
            console.error("Appwrite serive :: removeLike :: error", error);
            return false;
        }
    }

    async getLike({ userId, postId }) {
        console.log("userId",userId)
        let queryArray = [
            Query.equal("postId", postId),
        ];

        if (userId) {
            queryArray.push(Query.equal("userId", userId));
        }

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                queryArray
            )
        } catch (error) {
            console.error("Appwrite serive :: getLike :: error", error);
        }
    }

    //========================comments ===========================
    async createComments({ UserId, PostId, Comments, UserName }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                {
                    UserId,
                    PostId,
                    Comments,
                    UserName
                }
            )
        } catch (error) {
            console.error("Appwrite serive :: createComments :: error", error);
            return false;
        }
    }

    async removeComments(CommentId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCommentCollectionId,
                CommentId
            )
        } catch (error) {
            console.error("Appwrite serive :: removeComments :: error", error);
            return false;
        }
    }

    async getAllComments(PostId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCommentCollectionId,
                [
                    Query.equal("PostId", PostId),
                    Query.orderDesc("$createdAt")
                ]
            )
        } catch (error) {
            console.error("Appwrite serive :: getAllComments :: error", error);
            return false;
        }
    }

    // ================== File Service =============

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.error("Appwrite serive :: uploadFile :: error", error);
            return false;
        }
    }

    async delateFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.error("Appwrite serive :: delatePost :: error", error);
        }
    }

    async getFilePreview(fileId) {
        try {
            const res = await this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            return res;
        } catch (error) {
            console.error("Appwrite serive :: getFilePreview :: error", error);
        }
    }

}

// Function to generate an array of n random unique indices within range [0, max)
function generateRandomIndices(max, n) {
    const indices = new Set();
    while (indices.size < n) {
        indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
}

const postService = new PostService();
export default postService;