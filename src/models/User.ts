import { injectable, inject } from "tsyringe";
import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

<<<<<<< HEAD
export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}
=======
@injectable()
export class User {
  constructor(private data: UserProps, @inject("Eventing") public events: Eventing) {}
>>>>>>> c55ccea1bc4d98101033ede69cf6cee8067dd8c6

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get("id")}`).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
  save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post("http://localhost:3000/users", this.data).then((response: AxiosResponse): void => {
        this.set(response.data);
      });
    }
  }
}
