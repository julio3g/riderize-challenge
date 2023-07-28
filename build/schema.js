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

// src/schema.ts
var schema_exports = {};
__export(schema_exports, {
  Booking: () => Booking,
  Ride: () => Ride,
  User: () => User
});
module.exports = __toCommonJS(schema_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Booking,
  Ride,
  User
});
