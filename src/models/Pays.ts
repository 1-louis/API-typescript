
export default class Pays{

    private nom: string | null;
    private idPays: number;

    constructor(id: number, name ? : string) {
        this.idPays = id;
        this.nom = (name === undefined) ? null : name;
    }

    get id(): number {
        return this.idPays;
    }

    get name(): string {
        // (1 == '1') = true
        // (1 === '1') = false
        return (this.nom === null) ? '' : this.nom;
    }

}