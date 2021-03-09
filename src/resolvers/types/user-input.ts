import { InputType, Field, ID } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => ID)
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: 2 })
  permissionLevel: number;
}
