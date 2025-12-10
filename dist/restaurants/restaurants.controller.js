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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const swagger_1 = require("@nestjs/swagger");
let RestaurantsController = class RestaurantsController {
    restaurantsService;
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    findAll(query) {
        return this.restaurantsService.findAll(query);
    }
    findOne(id) {
        return this.restaurantsService.findOne(id);
    }
    findMenu(id) {
        return this.restaurantsService.findMenu(id);
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List restaurants' }),
    (0, swagger_1.ApiQuery)({ name: 'lat', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'lng', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'radius', required: false, description: 'Radius in km' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get restaurant details' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/restaurant.entity").Restaurant }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/menu'),
    (0, swagger_1.ApiOperation)({ summary: 'Get restaurant menu' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findMenu", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
//# sourceMappingURL=restaurants.controller.js.map