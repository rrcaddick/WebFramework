import { User } from "./models/User";

const users = User.getUsers();

users.on("change", () => {
  console.log(users);
});

users.fetch();
