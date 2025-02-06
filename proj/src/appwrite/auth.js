import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Method to delete an existing session if it exists
    async deleteExistingSession() {
        try {
            // Fetch the current session
            const session = await this.account.getSession('current');
            if (session) {
                // Delete the existing session
                await this.account.deleteSession(session.$id);
                console.log("Existing session deleted:", session.$id);
            }
        } catch (error) {
            // If no session exists, this will throw an error, so we ignore it
            console.log("No active session to delete.");
        }
    }

    async createAccount({ email, password, name }) {
        try {
            await this.account.create(ID.unique(), email, password, name); // Create the account
            return this.login({ email, password }); // Login immediately after account creation
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Delete existing session before creating a new one
            await this.deleteExistingSession();

            // Create a new session
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Fetched user:", user);
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions(); // Delete all active sessions
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;