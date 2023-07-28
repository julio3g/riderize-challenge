"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/app.ts
var import_apollo_server_express = require("apollo-server-express");
var import_config = require("dotenv/config");
var import_express = __toESM(require("express"));
var import_reflect_metadata = require("reflect-metadata");
var import_type_graphql5 = require("type-graphql");

// src/http/middlewares/authMiddleware.ts
var import_jsonwebtoken = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = void 0;
    next();
    return;
  }
  const [, token] = authHeader.split(" ");
  if (token) {
    try {
      const payload = (0, import_jsonwebtoken.verify)(token, process.env.SECRET_TOKEN);
      req.user = payload;
    } catch (err) {
      console.log("Token verification error:", err);
    }
  }
  next();
}

// src/resolvers/BookingResolver.ts
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

// src/resolvers/RideResolver.ts
var import_type_graphql3 = require("type-graphql");

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
  (0, import_type_graphql3.Query)(() => [Ride]),
  (0, import_type_graphql3.Authorized)()
], RideResolver.prototype, "rides", 1);
__decorateClass([
  (0, import_type_graphql3.Query)(() => [Ride]),
  (0, import_type_graphql3.Authorized)(),
  __decorateParam(0, (0, import_type_graphql3.Ctx)())
], RideResolver.prototype, "ridesByUser", 1);
__decorateClass([
  (0, import_type_graphql3.Mutation)(() => Ride),
  __decorateParam(0, (0, import_type_graphql3.Arg)("name")),
  __decorateParam(1, (0, import_type_graphql3.Arg)("startDate")),
  __decorateParam(2, (0, import_type_graphql3.Arg)("startDateRegistration")),
  __decorateParam(3, (0, import_type_graphql3.Arg)("endDateRegistration")),
  __decorateParam(4, (0, import_type_graphql3.Arg)("additionalInformation", () => String, { nullable: true })),
  __decorateParam(5, (0, import_type_graphql3.Arg)("startPlace")),
  __decorateParam(6, (0, import_type_graphql3.Arg)("participantsLimit", () => Number, { nullable: true })),
  __decorateParam(7, (0, import_type_graphql3.Ctx)())
], RideResolver.prototype, "createRide", 1);
RideResolver = __decorateClass([
  (0, import_type_graphql3.Resolver)(Ride)
], RideResolver);

// src/resolvers/UserResolver.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
var import_type_graphql4 = require("type-graphql");

// src/repositories/prisma/prismaUsersRepository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async create(data) {
    return await prisma.user.create({ data });
  }
};

// src/useCases/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());
    if (!user)
      throw new Error("Invalid credentials.");
    const doestPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password);
    if (!doestPasswordMatches)
      throw new Error("Invalid credentials.");
    return user;
  }
};

// src/useCases/factories/makeAuthenticateUseCase.ts
function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
  return authenticateUseCase;
}

// src/useCases/register.ts
var import_bcryptjs2 = require("bcryptjs");
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const passwordHash = await (0, import_bcryptjs2.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail)
      throw new Error("E-mail already exists.");
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    });
    return user;
  }
};

// src/useCases/factories/makeRegisterUseCase.ts
function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);
  return registerUseCase;
}

// src/resolvers/UserResolver.ts
var UserResolver = class {
  async createUser(name, email, password) {
    const registerUseCase = makeRegisterUseCase();
    return await registerUseCase.execute({ name, email, password });
  }
  async session(email, password) {
    const authenticateUseCase = makeAuthenticateUseCase();
    const user = await authenticateUseCase.execute({ email, password });
    return (0, import_jsonwebtoken2.sign)({ userId: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "6h"
    });
  }
};
__decorateClass([
  (0, import_type_graphql4.Mutation)(() => User),
  __decorateParam(0, (0, import_type_graphql4.Arg)("name")),
  __decorateParam(1, (0, import_type_graphql4.Arg)("email")),
  __decorateParam(2, (0, import_type_graphql4.Arg)("password"))
], UserResolver.prototype, "createUser", 1);
__decorateClass([
  (0, import_type_graphql4.Mutation)(() => String),
  __decorateParam(0, (0, import_type_graphql4.Arg)("email")),
  __decorateParam(1, (0, import_type_graphql4.Arg)("password"))
], UserResolver.prototype, "session", 1);
UserResolver = __decorateClass([
  (0, import_type_graphql4.Resolver)(User)
], UserResolver);

// src/app.ts
async function server() {
  const app = (0, import_express.default)();
  const schema = await (0, import_type_graphql5.buildSchema)({
    resolvers: [UserResolver, RideResolver, BookingResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.user;
    }
  });
  const apolloServer = new import_apollo_server_express.ApolloServer({
    schema,
    context: ({ req }) => {
      var _a;
      const context = {
        req,
        token: (_a = req == null ? void 0 : req.headers) == null ? void 0 : _a.authorization
      };
      return context;
    }
  });
  app.use(authMiddleware);
  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
  });
  app.listen(4e3, () => console.log("server started on :4000"));
}

// src/server.ts
server();
