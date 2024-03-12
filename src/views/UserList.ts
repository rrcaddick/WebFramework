import { User, UserProps } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserItem } from "./UserItem";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserItem(itemParent, model).render();
  }
}
