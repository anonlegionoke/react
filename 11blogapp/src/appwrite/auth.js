import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

/* We need 3 things to create an account using
appwrite, which are

1.client - first we create a new Client inside the class
2.account - then we create a new Account to this client
3.id - need a unique id for each created user which can be obtained from appwrite itself*/

/* Appwrite is like a service
hence we call the class AuthService */

export class AuthService {
    client = new Client() 
    account;

/* To set an address (Url & Project ID defined in conf) for the client & to connect the client to the account
we need a function. so we use a constructor function inside the class AuthService */

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId) //should be dot-linked
        this.account = new Account(this.client)
    }
    /* To get ID and stuff, the code needs to do contact back and forth with conf
    to get these data.
    
    it will take some time. so we can't instantly call for it to do things, and needs a waiting.
    
    And to create that waiting, we use async & await*/

    /* and what are the things we are doing with these data?
    
    Signup, Log out, manage sessions, etc.*/

    async createAccount({ email, password, name }) {  /* In curly braces since we need to retrieve these input data */
/* REMEMBER to use try catch when writing 
these kind of jobs to get the error message */
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)

        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() ::", error);
        }
        return null
    }
    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout() ::", error)
        }
    }

}
const authService = new AuthService()

export default authService



