import axios, { AxiosResponse } from "axios";
import { EventProcessor } from "./EventProcessor";

export class Collection<T, K> {
  models: T[] = [];
  eventProcessor: EventProcessor = new EventProcessor();

  constructor(private rootUrl: string, private deserialize: (json: K) => T) {
    this.fetch();
  }

  get on() {
    return this.eventProcessor.on;
  }

  get trigger() {
    return this.eventProcessor.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse<K[]>) => {
      response.data.forEach((model: K) => this.models.push(this.deserialize(model)));

      this.trigger("change");
    });
  }
}
