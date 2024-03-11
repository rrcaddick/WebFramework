import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const root = document.getElementById("root");

if (root) {
  const userForm = new UserForm(root, new User({ name: "Ray", age: 43 }));
  userForm.render();
} else {
  throw new Error("Root element not found");
}
