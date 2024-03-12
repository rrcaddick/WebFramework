import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, new User({ name: "Ray", age: 43 }));
  userEdit.render();
} else {
  throw new Error("Root element not found");
}
