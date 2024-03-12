import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserItem extends View<User, UserProps> {
  constructor(public parent: Element, public model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <li>
        <div>
          User Name: ${this.model.get("name")}
        </div>
        <div>
          User Age: ${this.model.get("age")}
        </div>
      </li>
    `;
  }
}
