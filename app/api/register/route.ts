import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
    message: string
}

export async function POST(req: Request) {
    const body = await req.json();
    const {username, password} = body;
    console.log(body);

    // check if username and password are present
    if (!username || !password) {
        return Response.json({message: 'Missing username or password'});
    }

    // check if username is already taken in database
    const existingUser = await prisma.user.findUnique(
        {
            where: {
                username: username
            }
        }
    )

    // if user exists, return error
    if (existingUser) {
        return Response.json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create(
        {
            data: {
                username: username,
                password: hashedPassword
            }
        }
    )

    return Response.json(user);
}