import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { HasId, Sync } from "./Sync";

export interface UserProps extends HasId {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/user";

export class User {
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  public attributes: Attributes<UserProps>;m start
  

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }
}
