import { container } from "tsyringe";
import { Eventing, CustomEventing } from "../models/Eventing";

container.register<Eventing>("Eventing", { useClass: CustomEventing });
