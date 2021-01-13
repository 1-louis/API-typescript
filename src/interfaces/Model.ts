export interface ModelInterfaces {

    save(): Promise < any > ;
    select(where: any): Promise < any > ;
    attribut(): Array < string > ;
    selectAttribut(): Array < string > ;

}