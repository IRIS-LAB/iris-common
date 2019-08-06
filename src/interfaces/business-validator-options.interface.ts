import { ValidationOptions } from 'joi'
import { Messages } from './message.interface'

export interface BusinessValidatorOptions {
  messages?: Messages;
  joiOptions?: ValidationOptions
}
