import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Links, LinksModel } from '../entities/Links';
import { LinksInput } from './types/links-input';

@Resolver()
export class LinksResolver {
  @Query(_returns => Links, { nullable: false })
  async returnSingleLink(
    @Arg('id')
    id: string,
  ): Promise<Links | null> {
    return await LinksModel.findById({
      _id: id,
    });
  }

  @Query(() => [Links])
  async returnAllLinks(): Promise<Links[]> {
    return await LinksModel.find();
  }

  @Mutation(() => Links)
  async createLink(
    @Arg('data')
    { url, description }: LinksInput,
  ): Promise<Links> {
    const link = (
      await LinksModel.create({
        url,
        description,
      })
    ).save();
    return link;
  }

  @Mutation(() => Boolean)
  async deleteLink(
    @Arg('id')
    id: string,
  ): Promise<boolean> {
    await LinksModel.deleteOne({ id });
    return true;
  }
}
