declare module '@u-iris/iris-common';

declare class ErreurDO {
	constructor(champ: string, code: string, libelle: string);
	champErreur: string;
	codeErreur: string;
	libelleErreur: string;
}

declare class SecurityException extends Error {
	constructor(errors: Array<ErreurDO>);
}

declare class BusinessException extends Error {
	constructor(errors: Array<ErreurDO>);
}

declare class TechnicalException extends Error {
	constructor(errors: Array<ErreurDO>, causedException: Error);
}

declare class EntityNotFoundBusinessException extends Error {
	constructor(error: ErreurDO);
}
