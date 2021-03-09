import { ObjectType, Field } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
} from '@typegoose/typegoose';
// import { Ref } from '../types';

import { User } from './User';

@ObjectType({ description: 'The AuthPayload model' })
export class AuthPayload {
  @Field()
  @Property({ required: true })
  token: string;

  @Field()
  @Property({ ref: User, required: true })
  user: User;
}

export const AuthPayloadModel = getModelForClass(AuthPayload);
