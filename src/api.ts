import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/users/', async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.post('/users/create/:id/', async(req, res) => {
    const { id, username, email } = req.body;

    if (!id || !username || !email) {
        res.status(418).send({ message: "One or more required fields were not provided!" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                id,
                username,
                email,
            },
        });
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.delete('/users/delete/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.get('/users/user/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.patch('/users/user/update/:id', async(req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                username,
                email,
            },
        });
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

const server = app.listen(3030, () => {
    console.log(`Listening on http://localhost:3030`);
});