import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '../entities/User';
import { UserInput } from './types/user-input';
import { AuthPayload } from '../entities/AuthPayload';

@Resolver()
export class UserResolver {
  @Query(_returns => User, { nullable: false })
  async returnSingleUser(
    @Arg('id')
    id: string,
  ): Promise<User | null> {
    return await UserModel.findById({
      _id: id,
    });
  }

  @Query(() => [User])
  async returnAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  @Mutation(() => AuthPayload)
  async createUser(
    @Arg('data')
    { email, password, permissionLevel = 2 }: UserInput,
  ): Promise<AuthPayload> {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await (
      await UserModel.create({
        email,
        password: encryptedPassword,
        permissionLevel,
      })
    ).save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
    );

    return {
      user,
      token,
    };
  }

  //   @Mutation(() => Boolean)
  //   async login(
  //     @Arg('id')
  //     id: string,
  //   ): Promise<boolean> {
  //     await LinksModel.deleteOne({ id });
  //     return true;
  //   }
}
