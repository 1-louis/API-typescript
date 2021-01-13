import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import DateException from '../exception/DateException';
import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';

const split = (token: string) => { return token.split('Bearer ').join('') }

export const authMidd = (req: Request, res: Response, next: () => void) => {

    // req.header.authorization = 'Bearer opfokre65ze4f6ez54f6ez4f6z4f6ze87f6ez4fe8z7fze486fez68fe6z5f4e6z54f8ef864ez84fe8ze.9e4fz9e64f6e5z4f6ez54f654ez
    try {
        if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY))
            return next()
        else
            throw new Error(`Authorization not found`)
    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }

}


export const registerMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;

    const champsRequire = [`nom`, `prenom`, `dateNaiss`, `pays`, `email`, `adresse`, `ville`, `zipcode`, `password`]

    try {

        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data) {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2); // Delete ', '
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (EmailException.checkEmail(data.email)) // Check valid syntaxe email
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password)) // Check valid syntaxe password
            throw new PasswordException();
        // if (!DateException.checkDate(data.dateNaiss)) // Check valid syntaxe password
        //     throw new DateException();

        next()

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}


export const loginMidd = (req: Request, res: Response, next: () => void) => {

    let data: any = req.body;

    const champsRequire = [`email`, `password`]

    try {

        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire) {
            error = true;
            for (const champs in data) {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0) {
            textError = textError.slice(0, -2); // Delete ', '
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (EmailException.checkEmail(data.email)) // Check valid syntaxe email
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password)) // Check valid syntaxe password
            throw new PasswordException();

        next()

    } catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
}