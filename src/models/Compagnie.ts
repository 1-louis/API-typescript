export default class Compagnie {

    private nom: string | null;
    private idCompagnie: number;

    constructor(id: number, name ? : string) {
        this.idCompagnie = id;
        this.nom = (name === undefined) ? null : name;
    }

    get id(): number {
        return this.idCompagnie;
    }

    get name(): string {
        // (1 == '1') = true
        // (1 === '1') = false
        return (this.nom === null) ? '' : this.nom;
    }

}