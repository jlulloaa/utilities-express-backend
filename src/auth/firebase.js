import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SERVICEACCOUNTJSON);

admin.initializeApp({
    credential: admin.credential.cert('./src/auth/' + process.env.SERVICEACCOUNTJSON)
});

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Unauthorized');
    }
};

