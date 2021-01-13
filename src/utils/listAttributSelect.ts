export type listeTables = "pays" | "client" | "personne";

interface attributSelectInterface {
    primaryKey: string;
    attribut: Array < string > ;
}

/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect: Record < listeTables, attributSelectInterface > = { //Constructs a type with a set of properties Keys of type Type. This utility can be used to map the properties of a type to another type.
    "pays": {
        primaryKey: `idPays`,
        attribut: [`idPays`, `nom`]
    },
    "client": {
        primaryKey: `personne_idpersonne`,
        attribut: [`email`, `password`, `personne_idpersonne`]
    },
    "personne": {
        primaryKey: `idpersonne`,
        attribut: [`idpersonne`, `nom`, `prenom`, `dateNaiss`, `adresse`, `ville`, `zipcode`, `pays_idPays`]
    },
};

// export default { listAttributSelect, listeTables };
export default listAttributSelect;