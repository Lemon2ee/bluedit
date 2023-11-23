import NextAuth from "next-auth";
import {
    defaultCollections,
    MongoDBAdapter,
    MongoDBAdapterOptions,
} from "@auth/mongodb-adapter";
import type { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {MongoClient} from "mongodb";

const client_id = process.env.GOOGLE_OAUTH_ID;
const client_secret = process.env.GOOGLE_OAUTH_SECRET;
const mongo_uri = process.env.MONGO_URI;
if (!client_id || !client_secret || !mongo_uri) {
    throw new Error("Missing env variables for Auth");
}

const client = new MongoClient(mongo_uri, {})
const client_promise = client.connect();

const adapterOptions: MongoDBAdapterOptions = {
    databaseName: "bluedit",

    // If you want to use the default collections, you can spread them into the collections property:
    collections: {
        ...defaultCollections,
    },

    // If you want to customize any collection name, just override it:
    // collections: {
    //   ...defaultCollections,
    //   Users: "my_custom_users_collection"
    // }
};

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({ clientId: client_id, clientSecret: client_secret }),
    ],
    adapter: MongoDBAdapter(client_promise, adapterOptions),
}

/**
 * @see https://next-auth.js.org/configuration/providers
 */
const handler = NextAuth(authOptions)

/**
 * Different from example online written in JS, this is the workaround I found on github
 * that avoid the error "session provider Error: React Context is unavailable in Server Components"
 */
export { handler as GET, handler as POST };
