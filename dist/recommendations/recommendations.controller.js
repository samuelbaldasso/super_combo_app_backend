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
exports.RecommendationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const recommendations_service_1 = require("./recommendations.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let RecommendationsController = class RecommendationsController {
    recommendationsService;
    constructor(recommendationsService) {
        this.recommendationsService = recommendationsService;
    }
    getPersonalized(req, lat, lng) {
        return this.recommendationsService.getPersonalized(req.user, lat, lng);
    }
};
exports.RecommendationsController = RecommendationsController;
__decorate([
    (0, common_1.Get)('personalized'),
    (0, swagger_1.ApiOperation)({ summary: 'Get personalized recommendations' }),
    (0, swagger_1.ApiQuery)({ name: 'lat', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'lng', required: false }),
    openapi.ApiResponse({ status: 200, type: [require("../restaurants/entities/restaurant.entity").Restaurant] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('lat')),
    __param(2, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], RecommendationsController.prototype, "getPersonalized", null);
exports.RecommendationsController = RecommendationsController = __decorate([
    (0, swagger_1.ApiTags)('Recommendations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('recommendations'),
    __metadata("design:paramtypes", [recommendations_service_1.RecommendationsService])
], RecommendationsController);
//# sourceMappingURL=recommendations.controller.js.map