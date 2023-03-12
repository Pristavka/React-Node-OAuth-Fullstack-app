import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;

        const db = getDbConnection('spravker');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            return res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({ email, passwordHash, isEmailVerified: false });

        const { insertedId } = result;

        jwt.sign({
            id: insertedId,
            email,
            isEmailVerified: false
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d'
        },
        (err, token) => {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).json({ token });
        });
    },
};