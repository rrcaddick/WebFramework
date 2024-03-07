import axios, { AxiosResponse } from "axios";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  private events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName] || [];

    for (let callback of handlers) {
      callback();
    }
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
