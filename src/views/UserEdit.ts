import { Collection } from "../models/Collection";
import { User, UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { UserShow } from "./UsersShow";
import { View } from "./View";

export class UserEdit extends View<User, UserProps> {
  constructor(public parent: Element, public model: User) {
    super(parent, model);
  }

  regionsMap: { [key: string]: string } = {
    userShow: ".user-show",
    userForm: ".user-form",
    userList: ".user-list",
  };

  onRender(): void {
    new UserShow(this.regions?.userShow, this.model).render();

    new UserForm(this.regions?.userForm, this.model).render();

    const users = User.getUsers();
    users.fetch();

    users.on("change", () => {
      new UserList(this.regions?.userList, users).render();
    });
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
        <ul class="user-list"></ul>
      </div>
    `;
  }
}
