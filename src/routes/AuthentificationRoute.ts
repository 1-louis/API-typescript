import { Router } from 'express';
import { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { registerMidd, loginMidd, authMidd } from '../middlewares/auth.middleware';



const route: Router = Router();

route.get('/', authMidd, (req: Request, res: Response) => {
    return res.end('<h1>OOUUUIII tu es connecté</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)

export { route as AuthentificationRoute }