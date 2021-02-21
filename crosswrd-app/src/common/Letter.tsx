import { OrderedMap } from "immutable";

import { Reference } from "./Reference";

export type Letter = string;

export type Letters = OrderedMap<Reference, Letter>;
