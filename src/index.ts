import { User } from "./models/User";

const user = new User({ name: "Allan", age: 69 });

user.on("save", () => {
  console.log(user);
});

user.save();
