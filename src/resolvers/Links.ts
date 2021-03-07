
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Links, LinksModel } from "../entities/Links";
import { LinksInput } from "./types/links-input"

@Resolver()
export class LinksResolver {

    @Query(_returns => Links, { nullable: false})
    async returnSingleLink(
        @Arg("id")
        id: string
    ){

      return await LinksModel.findById({
          _id: id
        });
    };


    @Query(() => [Links])
    async returnAllLinks(){
        
      return await LinksModel.find();
    };

    @Mutation(() => Links)
    async createLink(
        @Arg("data")
        {url,description}: LinksInput
    ): Promise<Links> { 

      const link = (await LinksModel.create({      
          url,
          description
      })).save();
      return link;
    };


   @Mutation(() => Boolean)
   async deleteCategory(
       @Arg("id")
        id: string
    ) {

    await LinksModel.deleteOne({id});
    return true;
  }

}




// export const LinkResolver = {
//     Query: {
//         info: () => null,
//         feed: () => links,
//         link: (parent: any, {id}: Link) => links.find(l => l.id === id) || null
//       },
//       Mutation: {
//           post: (parent: any, {description = '', url = ''}: Link) => {
//               const link = {
//                   id: `link-${idCount++}`,
//                   description: description,
//                   url: url
//               }
//               links.push(link)
//               return link;
//           },
//           updateLink: (parent: any, {id, description, url}: Link) => {
//               const index = links.findIndex(l => l.id === id);
//               if (index === -1) {
//                   return null;
//               }
//               let link = links[index];
//               link = { 
//                   ...link, 
//                   description: description || link.description,
//                   url: url || link.url
//                 }

//                 return link;
//           },
//           deleteLink: (parent: any, {id}: Link) => {
//             const index = links.findIndex(l => l.id === id);
//             if (index === -1) {
//                 return null;
//             }
            
//             return links.splice(index, 1);
//         }
//       }
// };