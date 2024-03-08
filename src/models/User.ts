import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { HasId, Sync } from "./Sync";
import { AxiosResponse } from "axios";

export interface UserProps extends HasId {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get get() {
    return this.attributes.get;
  }

  set = (update: UserProps): void => {
    this.attributes.set(update);
    this.trigger("change");
  };

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync
      .fetch(id)
      .then((response: AxiosResponse<UserProps>) => {
        this.set(response.data);
      })
      .catch(() => {
        this.trigger("error");
      });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse<UserProps>) => {
        this.trigger("save");
        this.set(response.data);
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
