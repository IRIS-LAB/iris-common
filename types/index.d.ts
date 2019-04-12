declare module '@u-iris/iris-common';

declare class ErreurDO {
	constructor(champ: string, code: string, libelle: string);
	champErreur: string;
	codeErreur: string;
	libelleErreur: string;
}

declare class SecurityException extends Error {
	errors: ErreurDO[];
	constructor(errors: ErreurDO[]);
}

declare class BusinessException extends Error {
	errors: ErreurDO[];
	constructor(errors: ErreurDO[]);
}

declare class TechnicalException extends Error {
	errors: ErreurDO[];
	constructor(errors: ErreurDO[], causedException: Error);
}

declare class EntityNotFoundBusinessException extends Error {
	errors: ErreurDO[];
	constructor(error: ErreurDO);
}
