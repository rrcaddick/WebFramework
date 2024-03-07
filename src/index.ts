import { User } from "./models/User";

//@ts-ignore - TODO: Fix why tsconfig show an error when CustomEvent class in being injected
const user = new User({ id: 1, name: "Raymond", age: 34 });

user.save();
