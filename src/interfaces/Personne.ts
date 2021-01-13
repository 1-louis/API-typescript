export interface PersonneInterfaces {
    idpersonne ? : number;
    nom ? : string;
    prenom ? : string;
    dateNaiss ? : any;
    adresse ? : string;
    ville ? : string;
    zipcode ? : string;
    pays_idPays ? : number;
    id ? : number;
    pays ? : string;
    fullname ? : string;
    address ? : string;
    attributInsert ? : Array < string > ;
    save(): Promise < number > ;
}