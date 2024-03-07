import { User } from "./models/User";

const user = new User({ name: "Ray", age: 34 });

user.on("change", () => {
  console.log("1st Change");
});
user.on("change", () => {
  console.log("2st Change");
});
user.on("click", () => {
  console.log("You just clicked");
});

user.trigger("change");
user.trigger("click");
user.trigger("save");
