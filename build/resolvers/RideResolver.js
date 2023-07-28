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

// src/resolvers/RideResolver.ts
var RideResolver_exports = {};
__export(RideResolver_exports, {
  RideResolver: () => RideResolver
});
module.exports = __toCommonJS(RideResolver_exports);
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

// src/useCases/createRide.ts
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

// src/useCases/factories/makeCreateRideUseCase.ts
function makeCreateRideUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository();
  const createRideUseCase = new CreateRideUseCase(prismaRidesRepository);
  return createRideUseCase;
}

// src/useCases/fetchRidesByCreatorId.ts
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

// src/useCases/factories/makeFetchRidesByCreatorId.ts
function makeFetchRidesByCreatorIdUseCase() {
  const prismaRidesRepository = new PrismaRidesRepository();
  const fetchRidesByCreatorIdUseCase = new FetchRidesByCreatorIdUseCase(
    prismaRidesRepository
  );
  return fetchRidesByCreatorIdUseCase;
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

// src/resolvers/RideResolver.ts
var RideResolver = class {
  async rides() {
    const fetchRidesUseCase = makeFetchRidesUseCase();
    return await fetchRidesUseCase.execute({});
  }
  async ridesByUser(context) {
    const fetchRidesByCreatorIdUseCase = makeFetchRidesByCreatorIdUseCase();
    return await fetchRidesByCreatorIdUseCase.execute({
      creatorId: context.req.user.userId
    });
  }
  async createRide(name, start_date, start_date_registration, end_date_registration, additional_information, start_place, participants_limit, context) {
    if (!context.req.user)
      throw new Error("You must be authenticated to create a ride");
    const createRideUseCase = makeCreateRideUseCase();
    return await createRideUseCase.execute({
      name,
      start_date: new Date(start_date),
      start_date_registration: new Date(start_date_registration),
      end_date_registration: new Date(end_date_registration),
      additional_information,
      start_place,
      participants_limit,
      creatorId: context.req.user.userId
    });
  }
};
__decorateClass([
  (0, import_type_graphql2.Query)(() => [Ride]),
  (0, import_type_graphql2.Authorized)()
], RideResolver.prototype, "rides", 1);
__decorateClass([
  (0, import_type_graphql2.Query)(() => [Ride]),
  (0, import_type_graphql2.Authorized)(),
  __decorateParam(0, (0, import_type_graphql2.Ctx)())
], RideResolver.prototype, "ridesByUser", 1);
__decorateClass([
  (0, import_type_graphql2.Mutation)(() => Ride),
  __decorateParam(0, (0, import_type_graphql2.Arg)("name")),
  __decorateParam(1, (0, import_type_graphql2.Arg)("startDate")),
  __decorateParam(2, (0, import_type_graphql2.Arg)("startDateRegistration")),
  __decorateParam(3, (0, import_type_graphql2.Arg)("endDateRegistration")),
  __decorateParam(4, (0, import_type_graphql2.Arg)("additionalInformation", () => String, { nullable: true })),
  __decorateParam(5, (0, import_type_graphql2.Arg)("startPlace")),
  __decorateParam(6, (0, import_type_graphql2.Arg)("participantsLimit", () => Number, { nullable: true })),
  __decorateParam(7, (0, import_type_graphql2.Ctx)())
], RideResolver.prototype, "createRide", 1);
RideResolver = __decorateClass([
  (0, import_type_graphql2.Resolver)(Ride)
], RideResolver);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideResolver
});
