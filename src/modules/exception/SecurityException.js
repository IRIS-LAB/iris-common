export class SecurityException extends Error {
	constructor(errors) {
		super();
		this.errors = errors;
	}
}
