import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
} from '@typegoose/typegoose';

@ObjectType({ description: 'The User model' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  password: string;

  @Field({ nullable: true })
  permissionLevel: number;
}

export const UserModel = getModelForClass(User);
