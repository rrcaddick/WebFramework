import { AtrributeService } from "./AttributeService";
import { EventProcessor } from "./EventProcessor";
import { HasId, DataService } from "./DataService";
import { Model } from "./Model";

export interface UserProps extends HasId {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  constructor(userProps: UserProps) {
      super(
        new EventProcessor(), 
        new DataService<UserProps>(rootUrl), 
        new AtrributeService<UserProps>(userProps)
    );
  }
}
