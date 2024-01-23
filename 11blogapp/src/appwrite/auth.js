import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
/* To get ID and stuff, the code is need to contact back and forth
to get access these data.

it will take some time. so we can't instantly call for it and needs waiting.

And for waiting, we use async & await*/
    
/* and what are the functions we do require these kind of data?

Signup, Log out, session manage, etc.*/
    
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
                
        } catch (error) {
            throw error
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password )
            
        } catch (error) {
            throw error
        }
     }
    async getCurrentUser() { 
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error)
        }
        return null
    }
    async logout() { 
        try {
            return await this.account.deleteSessions()
        } catch (error) {
         console.log("Appwrite service :: logout() :: ", error) 
        }
    }
    
}

/* A class needs an object to invoke upon the creation of 
an object.

BASICALLY JUST REMEMBER ABOUT
Object when creating a class

give it a name similar to the class itself.

like changing the caps.*/

const authService = new AuthService()

export default authService



