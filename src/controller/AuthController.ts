import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';


import Client from '../models/Client';
import Personne from '../models/Personne';
import PasswordException from '../exception/PasswordException';

export class AuthController {

    static login = async(req: Request, res: Response) => {

        let data: any = req.body;

        try {
            let client: any = await Client.select({ email: data.email });
            if (client.length < 0)
                throw new Error(`Email don't exist!`)
            client = client[0];

            const isOk = await PasswordException.comparePassword(data.password, client.password);

            if (!isOk)
                throw new Error(`User is undefined!`)

            const theToken: any = await sign({ id: client.personne_idpersonne, name: client.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    /**
     *
     *
     * @static
     * @memberof AuthController
     */
    static register = async(req: Request, res: Response) => {
        let data: any = req.body;

        try {
            if (await Client.isExiste(data.email))
                throw new Error(`Email exist!`)

            const personne = new Personne(null, data.prenom, data.nom, data.dateNaiss, data.pays, data.adresse, data.ville, data.zipcode);
            await personne.save();
            const pass = await PasswordException.hashPassword(data.password);
            const client = new Client(personne, data.email, pass);
            await client.save();

            const theToken: any = await sign({ id: client.personne_idpersonne, name: client.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);

        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    refreshToken = async(req: Request, res: Response) => {}
    checkToken = async(req: Request, res: Response) => {}
    logout = async(req: Request, res: Response) => {}

}