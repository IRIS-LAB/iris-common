/**
 * Classe représentant une erreur fonctionnelle.
 */
export class ErreurDO {

    /**
     * Le nom du champ en erreur.
     */
    public champErreur: string

    /**
     * Le code de l'erreur, généralement ${type_du_champ}.${type_erreur} (ex: string.required).
     */
    public codeErreur: string

    /**
     * Le libellé de l'erreur.
     */
    public libelleErreur: string

    /**
     * Constructeur par défaut
     * @param champErreur (string) le champ en erreur
     * @param codeErreur (string) le code de l'erreur
     * @param libelleErreur (string) le libellé par défaut
     */
    constructor(champErreur: string, codeErreur: string, libelleErreur: string) {
        this.libelleErreur = libelleErreur
        this.codeErreur = codeErreur
        this.champErreur = champErreur
    }
}
