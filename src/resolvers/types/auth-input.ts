import { InputType, Field, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class AuthInput {
  @Field(() => ID)
  user: ObjectId;

  @Field()
  token: string;
}
