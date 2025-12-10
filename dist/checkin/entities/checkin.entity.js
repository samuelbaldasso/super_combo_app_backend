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
exports.CheckIn = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
let CheckIn = class CheckIn {
    id;
    user_id;
    user;
    restaurant_id;
    restaurant;
    reservation_id;
    order_id;
    check_in_time;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, user_id: { required: true, type: () => String }, user: { required: true, type: () => require("../../auth/entities/user.entity").User }, restaurant_id: { required: true, type: () => String }, restaurant: { required: true, type: () => require("../../restaurants/entities/restaurant.entity").Restaurant }, reservation_id: { required: true, type: () => String }, order_id: { required: true, type: () => String }, check_in_time: { required: true, type: () => Date }, status: { required: true, type: () => String } };
    }
};
exports.CheckIn = CheckIn;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CheckIn.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckIn.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.checkins),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CheckIn.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckIn.prototype, "restaurant_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.checkins),
    (0, typeorm_1.JoinColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], CheckIn.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CheckIn.prototype, "reservation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CheckIn.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CheckIn.prototype, "check_in_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], CheckIn.prototype, "status", void 0);
exports.CheckIn = CheckIn = __decorate([
    (0, typeorm_1.Entity)('checkins')
], CheckIn);
//# sourceMappingURL=checkin.entity.js.map