import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Links, LinksModel } from '../entities/Links';
import { LinksInput } from './types/links-input';

@Resolver()
export class LinksResolver {
  @Query(_returns => Links, { nullable: false })
  async returnSingleLink(
    @Arg('id')
    id: string,
  ) {
    return await LinksModel.findById({
      _id: id,
    });
  }

  @Query(() => [Links])
  async returnAllLinks() {
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
  async deleteCategory(
    @Arg('id')
    id: string,
  ) {
    await LinksModel.deleteOne({ id });
    return true;
  }
}
