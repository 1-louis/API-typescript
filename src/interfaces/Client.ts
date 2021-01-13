import { PersonneInterfaces } from './Personne';
export interface ClientInterfaces extends PersonneInterfaces {
    personne_idpersonne: number | null | undefined;
    email: string;
    password: string;

    save(): Promise < number >
}