import { AtrributeService } from "./AttributeService";
import { EventProcessor } from "./EventProcessor";
import { HasId, DataService, GraphqlDataService } from "./DataService";
import { IAtrributeService, IDataService, IEventProcessor, Model } from "./Model";
import { Collection } from "./Collection";

export interface UserProps extends HasId {
  id?: number;
  name?: string;
  age?: number;
}

interface ConfigOptions {
  eventProcessor?: IEventProcessor;
  dataService?: IDataService<UserProps>;
  attributeService?: IAtrributeService<UserProps>;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  constructor(userProps: UserProps, configOptions?: ConfigOptions) {
    const eventProcessor = configOptions?.eventProcessor || new EventProcessor();
    const dataService = configOptions?.dataService || new DataService<UserProps>(rootUrl);
    const attributeService = configOptions?.attributeService || new AtrributeService<UserProps>(userProps);

    super(eventProcessor, dataService, attributeService);
  }
  static getUsers(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (user) => new User(user));
  }

  // Example of how various static build methods can be used to leverage alternative interface implementations
  static buildGraphqlUser(userProps: UserProps): User {
    const user = new User(userProps, { dataService: new GraphqlDataService<UserProps>(rootUrl) });

    return user;
  }

  setRandomAge(): void {
    const age = Math.floor(Math.random() * 100);

    this.set({ age });
  }
}
