import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { Links } from "../../entities/Links";

@InputType()
export class LinksInput implements Partial<Links> {

  @Field()
  url: string;

  @Field()
  @Length(1, 255)
  description: String;

}