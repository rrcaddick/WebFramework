import { User } from "./models/User";

const user = new User({ name: "Allan" });

user.on("change", () => {});

user.trigger("change");
