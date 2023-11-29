import { prismaMock } from './singleton'
import prisma from './client'

interface CreateUser {
    id: string
    name:string
    username: string
    password: string
    image: string
}

export async function createUser(user: CreateUser) {
    return prisma.user.create({
        data: user,
    });
}

describe('post', () => {
    test('should create new user ', async () => {
        const user = {
            id: '1',
            name: 'Yuqiao',
            username: 'SU',
            password: 'YS',
            image: 'image'
        }

        prismaMock.user.create.mockResolvedValue(user)

        await expect(createUser(user)).resolves.toEqual({
            id: '1',
            name: 'Yuqiao',
            username: 'SU',
            password: 'YS',
            image: 'image'
        })
    });
});