import Pays from './Pays';
import MySQL from '../db/MySQL';
export default class Personne {

    protected idpersonne ? : number | null;
    public nom: string | null;
    public prenom: string | null;
    public dateNaiss: string | null;
    public adresse ? : string;
    public ville ? : string;
    public zipcode ? : string;
    public pays_idPays: number;

    protected table: string = 'personne';

    /**
     * Creates an instance of Personne.
     * @param {(Personne(instance) | null)} id
     * @param {string} [firstname='']
     * @param {string} [lastname='']
     * @param {string} [dateNaiss='']
     * @param {number} [idPays=1]
     * @param {string} [adresse]
     * @param {string} [ville]
     * @param {string} [zipcode]
     * @memberof Personne
     */
    constructor(personne: Personne | null, firstname: string = '', lastname: string = '', dateNaiss: string = '', idPays: number = 1, adresse ? : string, ville ? : string, zipcode ? : string) {
        if (personne === null) {
            this.ville = ville;
            this.adresse = adresse;
            this.zipcode = zipcode;
            this.pays_idPays = idPays;
            this.dateNaiss = dateNaiss;
            this.nom = lastname.toUpperCase().trim();
            this.prenom = firstname.toLowerCase().trim();
        } else {
            this.nom = personne.nom;
            this.ville = personne.ville;
            this.prenom = personne.prenom;
            this.zipcode = personne.zipcode;
            this.adresse = personne.adresse;
            this.dateNaiss = personne.dateNaiss;
            this.pays_idPays = personne.pays_idPays;
            this.idpersonne = personne.id;
        }

    }

    /************************* GETTER *************************/

    get id(): number {
        return <number > this.idpersonne;
    }

    get fullname(): string {
        return this.prenom + ' ' + this.nom;
    }

    get pays(): string {
        return new Pays( < number > this.pays_idPays).name;
    }

    get address(): string {
        return this.adresse + ' ' + this.ville + ',' + this.zipcode;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof Personne
     */
    get attributInsert(): Array < string > {
        return ['nom', 'prenom', 'dateNaiss', 'adresse', 'ville', 'zipcode', 'pays_idPays']
    }

    /************************* METHOD *************************/

    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Personne
     */
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.idpersonne = id;
                console.log(`Save ${this.table}`);
                resolve(id)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        })
    };

    /************************* STATIC METHOD *************************/

    static select(where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('personne', where).then((arrayPersonne: Array < any > ) => {
                    let data: Array < Personne > = [];
                    for (const personne of arrayPersonne) {
                        personne.dateNaiss = new String(personne.dateNaiss)
                        personne.id = personne.idpersonne;
                        data.push(new Personne(personne));
                    }
                    console.log(data);
                    resolve(data)
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

}