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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/resolvers/BookingResolver.ts
var BookingResolver_exports = {};
__export(BookingResolver_exports, {
  BookingResolver: () => BookingResolver
});
module.exports = __toCommonJS(BookingResolver_exports);
var import_type_graphql2 = require("type-graphql");

// src/schema.ts
var import_type_graphql = require("type-graphql");
var User = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "name", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "email", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], User.prototype, "password", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Ride])
], User.prototype, "rides", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Booking])
], User.prototype, "bookings", 2);
User = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], User);
var Ride = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "name", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_date", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_date_registration", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "end_date_registration", 2);
__decorateClass([
  (0, import_type_graphql.Field)({ nullable: true })
], Ride.prototype, "additional_information", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "start_place", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => import_type_graphql.Int, { nullable: true })
], Ride.prototype, "participants_limit", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Ride.prototype, "creatorId", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => User)
], Ride.prototype, "creator", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => [Booking])
], Ride.prototype, "bookings", 2);
Ride = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], Ride);
var Booking = class {
};
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "rideId", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "userId", 2);
__decorateClass([
  (0, import_type_graphql.Field)()
], Booking.prototype, "subscription_date", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => User)
], Booking.prototype, "user", 2);
__decorateClass([
  (0, import_type_graphql.Field)(() => Ride)
], Booking.prototype, "ride", 2);
Booking = __decorateClass([
  (0, import_type_graphql.ObjectType)()
], Booking);

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

// src/useCases/fetchRides.ts
var FetchRidesUseCase = class {
  constructor(ridesRepository) {
    this.ridesRepository = ridesRepository;
  }
  async execute({}) {
    const rides = await this.ridesRepository.findMany();
    return rides;
  }
};

// src/useCases/factories/makeFetchRidesUseCase.ts
function makeFetchRidesUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository();
  const fetchRidesUseCase = new FetchRidesUseCase(prismaRidesRepository);
  return fetchRidesUseCase;
}

// src/resolvers/BookingResolver.ts
var BookingResolver = class {
  async bookings() {
    const fetchBookingsUseCase = makeFetchRidesUseCase();
    return fetchBookingsUseCase.execute({});
  }
  async bookingsByUser(context) {
    const userId = context.req.user.userId;
    const fetchBookingsByUserIdUseCase = makeFetchBookingsByUserIdUseCase();
    return await fetchBookingsByUserIdUseCase.execute({ userId });
  }
  async createBooking(rideId, context) {
    const userId = context.req.user.userId;
    const createBookingUseCase = makeCreateBookingUseCase();
    return await createBookingUseCase.execute({ rideId, userId });
  }
};
__decorateClass([
  (0, import_type_graphql2.Query)(() => [Booking]),
  (0, import_type_graphql2.Authorized)()
], BookingResolver.prototype, "bookings", 1);
__decorateClass([
  (0, import_type_graphql2.Query)(() => [Booking]),
  (0, import_type_graphql2.Authorized)(),
  __decorateParam(0, (0, import_type_graphql2.Ctx)())
], BookingResolver.prototype, "bookingsByUser", 1);
__decorateClass([
  (0, import_type_graphql2.Mutation)(() => Booking),
  (0, import_type_graphql2.Authorized)(),
  __decorateParam(0, (0, import_type_graphql2.Arg)("rideId")),
  __decorateParam(1, (0, import_type_graphql2.Ctx)())
], BookingResolver.prototype, "createBooking", 1);
BookingResolver = __decorateClass([
  (0, import_type_graphql2.Resolver)(Booking)
], BookingResolver);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookingResolver
});
