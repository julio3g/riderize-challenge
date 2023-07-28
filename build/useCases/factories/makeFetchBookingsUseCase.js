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

// src/useCases/factories/makeFetchBookingsUseCase.ts
var makeFetchBookingsUseCase_exports = {};
__export(makeFetchBookingsUseCase_exports, {
  makeFetchBookingsUseCase: () => makeFetchBookingsUseCase
});
module.exports = __toCommonJS(makeFetchBookingsUseCase_exports);

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

// src/useCases/fetchBookings.ts
var FetchBookingsUseCase = class {
  constructor(bookingsRepository) {
    this.bookingsRepository = bookingsRepository;
  }
  async execute({}) {
    const bookings = await this.bookingsRepository.findMany();
    return bookings;
  }
};

// src/useCases/factories/makeFetchBookingsUseCase.ts
function makeFetchBookingsUseCase() {
  const prismaBookingsRepository = new PrismaBookingsRepository();
  const fetchBookingsUseCase = new FetchBookingsUseCase(
    prismaBookingsRepository
  );
  return fetchBookingsUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFetchBookingsUseCase
});
