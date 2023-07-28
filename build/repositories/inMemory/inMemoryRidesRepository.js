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

// src/repositories/inMemory/inMemoryRidesRepository.ts
var inMemoryRidesRepository_exports = {};
__export(inMemoryRidesRepository_exports, {
  InMemoryRidesRepository: () => InMemoryRidesRepository
});
module.exports = __toCommonJS(inMemoryRidesRepository_exports);
var import_crypto = require("crypto");
var InMemoryRidesRepository = class {
  constructor() {
    this.items = [];
  }
  async findById(id) {
    const ride = this.items.find((item) => item.id === id);
    if (!ride)
      return null;
    return ride;
  }
  async findMany() {
    const all = this.items;
    return all;
  }
  async findManyByCreatorId(creatorId) {
    const rides = this.items.filter((item) => item.creatorId === creatorId);
    return rides;
  }
  async create(data) {
    var _a, _b;
    const ride = {
      id: (_a = data.id) != null ? _a : (0, import_crypto.randomUUID)(),
      name: data.name,
      start_date: new Date(data.start_date),
      start_date_registration: new Date(data.start_date_registration),
      end_date_registration: new Date(data.end_date_registration),
      additional_information: data.additional_information || null,
      start_place: data.start_place,
      participants_limit: (_b = data.participants_limit) != null ? _b : null,
      creatorId: data.creatorId
    };
    this.items.push(ride);
    return ride;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryRidesRepository
});
