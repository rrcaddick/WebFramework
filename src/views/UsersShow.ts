import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  constructor(public parent: Element, public model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <div>
        <h1>User Detail</h1>
        <div>${this.model.get("name")}</div>
        <div>${this.model.get("age")}</div>
      </div>
    `;
  }
}
