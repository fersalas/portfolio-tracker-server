import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
} from '@typegoose/typegoose';

@ObjectType({ description: 'The Links model' })
export class Links {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  url: string;

  @Field()
  @Property()
  description: string;
}

export const LinksModel = getModelForClass(Links);
