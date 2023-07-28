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

// src/useCases/createBooking.ts
var createBooking_exports = {};
__export(createBooking_exports, {
  CreateBookingUseCase: () => CreateBookingUseCase
});
module.exports = __toCommonJS(createBooking_exports);
var CreateBookingUseCase = class {
  constructor(bookingsRepository, ridesRepository) {
    this.bookingsRepository = bookingsRepository;
    this.ridesRepository = ridesRepository;
  }
  async execute({
    rideId,
    userId
  }) {
    const ride = await this.ridesRepository.findById(rideId);
    const subscription_date = /* @__PURE__ */ new Date();
    if (!ride)
      throw new Error("ride not found");
    if (subscription_date > ride.end_date_registration)
      throw new Error("Registration period has ended");
    const existingBooking = await this.bookingsRepository.findByRideId(rideId);
    if (existingBooking)
      throw new Error("User already booked this ride");
    const booking = await this.bookingsRepository.create({
      rideId,
      userId,
      subscription_date
    });
    return booking;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateBookingUseCase
});
