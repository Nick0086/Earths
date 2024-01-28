import { Client, Account ,ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService {

    client = new Client;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            

        this.account = new Account(this.client)
    }

    async CreateAccount({email,name,password}){
        console.log(conf.appwriteUrl)
        console.log(conf.appwriteBucketId)
        console.log(conf.appwriteCollectionId)
        console.log(conf.appwriteCommentCollectionId)
        console.log(conf.appwriteDatabaaseId)
        console.log(conf.appwriteLikeCollectionId)
        console.log(conf.appwriteProjectId)
        try {
            const createAccount = await this.account.create(ID.unique(),email,password,name);
            if(createAccount){
                return this.loginUser({email,password})
            }else{
                return false;
            }         
        } catch (error) {
            console.error("Authservice :: CreateAccount :: error", error);
        }
    }

    async loginUser({email,password}){
        console.log(conf.appwriteUrl)
        console.log(conf.appwriteBucketId)
        console.log(conf.appwriteCollectionId)
        console.log(conf.appwriteCommentCollectionId)
        console.log(conf.appwriteDatabaaseId)
        console.log(conf.appwriteLikeCollectionId)
        console.log(conf.appwriteProjectId)
        try {
            const respond = await this.account.createEmailSession(email,password);
            return respond;
        } catch (error) {
            console.error("Authservice :: loginUser :: error", error);
        }
    }

    async getuser(){
        console.log(conf.appwriteUrl)
        console.log(conf.appwriteBucketId)
        console.log(conf.appwriteCollectionId)
        console.log(conf.appwriteCommentCollectionId)
        console.log(conf.appwriteDatabaaseId)
        console.log(conf.appwriteLikeCollectionId)
        console.log(conf.appwriteProjectId)
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Authservice :: getuser :: error", error);      
        }
    }

    async logout() {
        try {
            console.log("logout call")
            return this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite serive :: logout :: error", error);
        }
    };
}

const authService = new AuthService();

export default authService;

