type Callback = () => void;

<<<<<<< HEAD
export class Eventing {
=======
export interface Eventing {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class CustomEventing implements Eventing {
>>>>>>> c55ccea1bc4d98101033ede69cf6cee8067dd8c6
  private events: { [key: string]: Callback[] } = {};

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
}
