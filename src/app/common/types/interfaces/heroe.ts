// Own
// Types
import { VotesDetails } from "@app/common/types/interfaces/votes-details";

export interface Heroe {
    id: number,
    name: string, 
    description: string,
    picture_url: string,
    creationDateDetails: string,
    creationSectionDetails: string,
    likes: number,
    dislikes: number,
    votesDetails: VotesDetails
}
