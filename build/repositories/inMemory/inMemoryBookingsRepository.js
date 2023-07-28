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

// src/repositories/inMemory/inMemoryBookingsRepository.ts
var inMemoryBookingsRepository_exports = {};
__export(inMemoryBookingsRepository_exports, {
  InMemoryBookingsRepository: () => InMemoryBookingsRepository
});
module.exports = __toCommonJS(inMemoryBookingsRepository_exports);
var import_crypto = require("crypto");
var InMemoryBookingsRepository = class {
  constructor() {
    this.items = [];
  }
  async findById(id) {
    const booking = this.items.find((item) => item.id === id);
    if (!booking)
      return null;
    return booking;
  }
  async findByRideId(rideId) {
    const booking = this.items.find((item) => item.rideId === rideId);
    if (!booking)
      return null;
    return booking;
  }
  async findMany() {
    const all = this.items;
    return all;
  }
  async findManyByUserId(userId) {
    const rides = this.items.filter((item) => item.userId === userId);
    return rides;
  }
  async create(data) {
    var _a;
    const ride = {
      id: (_a = data.id) != null ? _a : (0, import_crypto.randomUUID)(),
      rideId: data.rideId,
      userId: data.userId,
      subscription_date: /* @__PURE__ */ new Date()
    };
    this.items.push(ride);
    return ride;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryBookingsRepository
});
