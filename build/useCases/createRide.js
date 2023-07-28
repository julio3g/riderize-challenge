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

// src/useCases/createRide.ts
var createRide_exports = {};
__export(createRide_exports, {
  CreateRideUseCase: () => CreateRideUseCase
});
module.exports = __toCommonJS(createRide_exports);
var CreateRideUseCase = class {
  constructor(ridesRepository) {
    this.ridesRepository = ridesRepository;
  }
  async execute({
    name,
    start_date,
    start_date_registration,
    end_date_registration,
    additional_information,
    start_place,
    participants_limit,
    creatorId
  }) {
    const ride = await this.ridesRepository.create({
      name,
      start_date,
      start_date_registration,
      end_date_registration,
      additional_information,
      start_place,
      participants_limit,
      creatorId
    });
    return ride;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateRideUseCase
});
