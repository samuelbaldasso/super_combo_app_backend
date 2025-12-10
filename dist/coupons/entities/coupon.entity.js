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
exports.Coupon = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Coupon = class Coupon {
    id;
    code;
    title;
    description;
    discount_percentage;
    min_purchase;
    expiry_date;
    is_active;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, code: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, discount_percentage: { required: true, type: () => Number }, min_purchase: { required: true, type: () => Number }, expiry_date: { required: true, type: () => Date }, is_active: { required: true, type: () => Boolean } };
    }
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Coupon.prototype, "discount_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Coupon.prototype, "min_purchase", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Coupon.prototype, "expiry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "is_active", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)('coupons')
], Coupon);
//# sourceMappingURL=coupon.entity.js.map