import {Request, Response} from 'express';
import * as admin from 'firebase-admin';

/**
 *
 * @param req
 * @param res
 * @param next
 */
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: (err?: any) => void,
) {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).send({message: 'Unauthorized'});
  }

  if (!authorization.startsWith('Bearer')) {
    return res.status(401).send({message: 'Unauthorized'});
  }

  const split = authorization.split('Bearer ');

  if (split.length !== 2) {
    return res.status(401).send({message: 'Unauthorized'});
  }

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };
    return next();
  } catch (err: any) {
    console.error(`${err.code} - ${err.message}`);
    return res.status(401).send({message: 'Unauthorized'});
  }
}
