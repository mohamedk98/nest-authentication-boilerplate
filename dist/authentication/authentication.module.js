"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const authentication_controller_1 = require("./authentication.controller");
const authentication_entity_1 = require("../authentication.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const config_1 = require("@nestjs/config");
const jwtFactory = {
    useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
            expiresIn: '7d'
        }
    }),
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule]
};
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        providers: [authentication_service_1.AuthenticationService, jwt_strategy_1.JwtStrategy],
        controllers: [authentication_controller_1.AuthenticationController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([authentication_entity_1.Authentication]),
            jwt_1.JwtModule.registerAsync(jwtFactory),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' })
        ]
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map