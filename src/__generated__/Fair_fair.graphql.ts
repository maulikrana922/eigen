/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FairDetail_fair$ref } from "./FairDetail_fair.graphql";
declare const _Fair_fair$ref: unique symbol;
export type Fair_fair$ref = typeof _Fair_fair$ref;
export type Fair_fair = {
    readonly " $fragmentRefs": FairDetail_fair$ref;
    readonly " $refType": Fair_fair$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Fair_fair",
  "type": "Fair",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "FairDetail_fair",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '0dffc1dccb34a6cc8f39f9a4887193fb';
export default node;
