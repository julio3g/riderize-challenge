"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCases/fetchRidesByCreatorId.ts
var fetchRidesByCreatorId_exports = {};
__export(fetchRidesByCreatorId_exports, {
  FetchRidesByCreatorIdUseCase: () => FetchRidesByCreatorIdUseCase
});
module.exports = __toCommonJS(fetchRidesByCreatorId_exports);
var FetchRidesByCreatorIdUseCase = class {
  constructor(ridesRepository) {
    this.ridesRepository = ridesRepository;
  }
  async execute({
    creatorId
  }) {
    const rides = await this.ridesRepository.findManyByCreatorId(creatorId);
    return rides;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchRidesByCreatorIdUseCase
});
