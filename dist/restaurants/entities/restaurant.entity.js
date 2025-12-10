"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const reservation_entity_1 = require("../../reservations/entities/reservation.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const checkin_entity_1 = require("../../checkin/entities/checkin.entity");
let Restaurant = class Restaurant {
    id;
    name;
    description;
    image_url;
    address;
    latitude;
    longitude;
    rating;
    review_count;
    cuisine_type;
    categories;
    is_open;
    opening_hours;
    products;
    reservations;
    orders;
    checkins;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, image_url: { required: true, type: () => String }, address: { required: true, type: () => String }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, rating: { required: true, type: () => Number }, review_count: { required: true, type: () => Number }, cuisine_type: { required: true, type: () => String }, categories: { required: true, type: () => [String] }, is_open: { required: true, type: () => Boolean }, opening_hours: { required: true, type: () => String }, products: { required: true, type: () => [require("./product.entity").Product] }, reservations: { required: true, type: () => [require("../../reservations/entities/reservation.entity").Reservation] }, orders: { required: true, type: () => [require("../../orders/entities/order.entity").Order] }, checkins: { required: true, type: () => [require("../../checkin/entities/checkin.entity").CheckIn] } };
    }
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Restaurant.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "review_count", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "cuisine_type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Restaurant.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "is_open", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "opening_hours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checkin_entity_1.CheckIn, (checkin) => checkin.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "checkins", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)('restaurants')
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map