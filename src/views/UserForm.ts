import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  constructor(public parent: Element, public model: User) {
    super(parent, model);
  }

  eventsMap: { [key: string]: (event: Event) => void } = {
    "click:.set-age": this.setAgeHandler,
    "click:.update-name": this.updateNameHandler,
    "click:.save-model": this.saveUserHandler,
  };

  setAgeHandler(event: Event): void {
    this.model.setRandomAge();
  }

  saveUserHandler(event: Event): void {
    this.model.save();
  }

  updateNameHandler(event: Event): void {
    const input = this.parent.querySelector<HTMLInputElement>("#user-name");

    input && this.model.set({ name: input.value });
  }

  template(): string {
    return `
      <div>
        <input type="text" placeholder="${this.model.get("name")}" id="user-name"/>
        <button class="update-name">Update Name</button>
        <div>
          <button class="set-age">Set Random Age</button>
        </div>
        <div>
          <button class="save-model">Save</button>
        </div>
      </div>
    `;
  }
}
