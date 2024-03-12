import { HasId } from "../models/DataService";
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventsMap: { [key: string]: (event: Event) => void } = {};

  regions: { [key: string]: Element } = {};

  regionsMap: { [key: string]: string } = {};

  mapRegions(fragement: DocumentFragment): void {
    for (let key in this.regionsMap) {
      const selector = this.regionsMap[key];

      const element = fragement.querySelector(selector);

      if (element) this.regions[key] = element;
    }
  }

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

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");

    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.appendChild(templateElement.content);
  }
}
