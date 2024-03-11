import { HasId } from "../models/DataService";
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract eventsMap: { [key: string]: (event: Event) => void };

  abstract template(): string;

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragement: DocumentFragment): void {
    for (let eventKey in this.eventsMap) {
      const [eventName, selector] = eventKey.split(":", 2);

      fragement
        .querySelectorAll(selector)
        .forEach((element) => element.addEventListener(eventName, this.eventsMap[eventKey].bind(this)));
    }
  }

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");

    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.appendChild(templateElement.content);
  }
}
