import { AxiosPromise, AxiosResponse } from "axios";

type Callback = () => void;

interface IEventProcessor {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface IDataService<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface IAtrributeService<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

export interface HasId {
  id?: number;
}

export abstract class Model<T extends HasId> {
  constructor(
    private eventProcessor: IEventProcessor,
    private dataService: IDataService<T>,
    private attributeService: IAtrributeService<T>
  ) {}

  get get() {
    return this.attributeService.get;
  }

  set = (update: T): void => {
    this.attributeService.set(update);
    this.trigger("change");
  };

  get on() {
    return this.eventProcessor.on;
  }

  get trigger() {
    return this.eventProcessor.trigger;
  }

  fetch() {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.dataService
      .fetch(id)
      .then((response: AxiosResponse<T>) => {
        this.set(response.data);
      })
      .catch(() => {
        this.trigger("error");
      });
  }
  save(): void {
    this.dataService
      .save(this.attributeService.getAll())
      .then((response: AxiosResponse<T>) => {
        this.trigger("save");
        this.set(response.data);
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
