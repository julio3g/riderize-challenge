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

// src/useCases/factories/makeCreateBookingUseCase.ts
var makeCreateBookingUseCase_exports = {};
__export(makeCreateBookingUseCase_exports, {
  makeCreateBookingUseCase: () => makeCreateBookingUseCase
});
module.exports = __toCommonJS(makeCreateBookingUseCase_exports);

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

// src/repositories/prisma/prismaRidesRepository.ts
var PrismaRidesRepository = class {
  async findById(id) {
    const ride = await prisma.ride.findUnique({ where: { id } });
    return ride;
  }
  async findMany() {
    const all = await prisma.ride.findMany();
    return all;
  }
  async findManyByCreatorId(creatorId) {
    const rides = await prisma.ride.findMany({ where: { creatorId } });
    return rides;
  }
  async create(data) {
    const ride = await prisma.ride.create({ data });
    return ride;
  }
};

// src/useCases/createBooking.ts
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

// src/useCases/factories/makeCreateBookingUseCase.ts
function makeCreateBookingUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository();
  const prismaBookingsRepository = new PrismaBookingsRepository();
  const createBookingUseCase = new CreateBookingUseCase(
    prismaBookingsRepository,
    prismaRidesRepository
  );
  return createBookingUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeCreateBookingUseCase
});
