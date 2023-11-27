import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {randomBytes, randomUUID} from "crypto";

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider(
            {
                name: "Credentials",
                credentials: {
                    username: {label: "Username", type: "text", placeholder: "jsmith"},
                    password: {label: "Password", type: "password"},
                },
                async authorize(credentials) {
                    // check if credentials, username and password are present
                    if (!credentials || !credentials.password || !credentials.username) {
                        return null;
                    }

                    const {username, password} = credentials;

                    // check to see if user exists
                    const user = await prisma.user.findUnique(
                        {
                            where: {
                                username: username
                            }
                        }
                    )

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatch = bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    // if user's name is not set, set it to a random name
                    if (!user.name) {
                        user.name = user.username;
                    }

                    console.log(user);

                    return user;
                }
            }
        ),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

export default authOptions;