import { User } from "./models/User";

const user = new User({ id: 1, name: "Raymond", age: 34 });

user.save();
