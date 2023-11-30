import { prismaMock } from './singleton';
import prisma from './client';

interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    image: string;
}

async function createUser(user: User) {
    return prisma.user.create({
        data: user,
    });
}

async function getUser(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}

async function updateUser(id: string, data: Partial<User>) {
    return prisma.user.update({
        where: { id },
        data,
    });
}

async function deleteUser(id: string) {
    return prisma.user.delete({
        where: { id },
    });
}

describe('User Tests', () => {
    const user = {
        id: '1',
        name: 'Yuqiao',
        username: 'SU',
        password: 'YS',
        image: 'image'
    };

    test('should create new user', async () => {
        prismaMock.user.create.mockResolvedValue(user);
        await expect(createUser(user)).resolves.toEqual(user);
    });

    test('should retrieve a user', async () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        await expect(getUser(user.id)).resolves.toEqual(user);
    });

    test('should update a user', async () => {
        const updatedUserData = { ...user, name: 'Updated Name' };
        prismaMock.user.update.mockResolvedValue(updatedUserData);
        await expect(updateUser(user.id, { name: 'Updated Name' })).resolves.toEqual(updatedUserData);
    });

    test('should delete a user', async () => {
        prismaMock.user.delete.mockResolvedValue(user);
        await expect(deleteUser(user.id)).resolves.toEqual(user);

    });

});
