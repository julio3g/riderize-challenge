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

// src/useCases/factories/makeFetchBookingsByUserIdUseCase.ts
var makeFetchBookingsByUserIdUseCase_exports = {};
__export(makeFetchBookingsByUserIdUseCase_exports, {
  makeFetchBookingsByUserIdUseCase: () => makeFetchBookingsByUserIdUseCase
});
module.exports = __toCommonJS(makeFetchBookingsByUserIdUseCase_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/prisma/prismaBookingRepository.ts
var PrismaBookingsRepository = class {
  async findById(id) {
    const booking = await prisma.booking.findUnique({ where: { id } });
    return booking;
  }
  async findByRideId(rideId) {
    const booking = await prisma.booking.findFirst({ where: { rideId } });
    return booking;
  }
  async findManyByUserId(userId) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { ride: true }
    });
    return bookings;
  }
  async findMany() {
    const all = await prisma.booking.findMany({ include: { ride: true } });
    return all;
  }
  async create(data) {
    const booking = await prisma.booking.create({ data });
    return booking;
  }
};

// src/useCases/fetchBookingsByUser.ts
var FetchBookingsByUserIdUseCase = class {
  constructor(bookingsRepository) {
    this.bookingsRepository = bookingsRepository;
  }
  async execute({
    userId
  }) {
    const bookings = await this.bookingsRepository.findManyByUserId(userId);
    return bookings;
  }
};

// src/useCases/factories/makeFetchBookingsByUserIdUseCase.ts
function makeFetchBookingsByUserIdUseCase() {
  const prismaBookingsRepository = new PrismaBookingsRepository();
  const fetchBookingsByUserIdUseCase = new FetchBookingsByUserIdUseCase(
    prismaBookingsRepository
  );
  return fetchBookingsByUserIdUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFetchBookingsByUserIdUseCase
});
