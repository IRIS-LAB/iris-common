import { ErreurDO } from '~/do/ErreurDO'
import { TechnicalException } from '~/exception/TechnicalException'

describe('TechnicalException', () => {
    describe('stack', () => {
        it('display caused exception stack trace if inject', async () => {
            // GIVEN
            const error = new ErreurDO('champErreur', 'code.error', 'label error')
            const causeError = new Error('a libelleErreur')
            const myException = new TechnicalException([error], causeError)
            // WHEN
            const myStack = myException.stack
            // THEN
            expect(myStack).toContain('a libelleErreur')
        })
    })
})
