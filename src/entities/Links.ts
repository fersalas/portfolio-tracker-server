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
  url: String;

  @Field()
  @Property()
  description: String;
}

export const LinksModel = getModelForClass(Links);
