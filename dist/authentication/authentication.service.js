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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authentication_entity_1 = require("../authentication.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const exceptions_1 = require("@nestjs/common/exceptions");
const dist_1 = require("@nestjs/jwt/dist");
let AuthenticationService = class AuthenticationService {
    constructor(authenticationRepository, jwtService) {
        this.authenticationRepository = authenticationRepository;
        this.jwtService = jwtService;
    }
    async create(body) {
        const existingUser = await this.authenticationRepository.find({ where: { email: body.email } });
        if (existingUser.length) {
            throw new exceptions_1.BadRequestException("Email Already Used");
        }
        const salt = await (0, bcryptjs_1.genSalt)(12);
        const hashedPassword = await (0, bcryptjs_1.hash)(body.password, salt);
        const newUser = this.authenticationRepository.create({ email: body.email, password: hashedPassword, userType: body.userType.toString() });
        return await this.authenticationRepository.save(newUser);
    }
    async login({ email, password }) {
        const user = await this.authenticationRepository.findOne({ where: { email } });
        if (!user) {
            throw new exceptions_1.BadRequestException("Incorrect Email or Password");
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new exceptions_1.BadRequestException("Incorrect Email or Password");
        }
        const payload = Object.assign({}, user);
        const jwtPayload = this.jwtService.sign(payload);
        return { token: jwtPayload };
    }
    async findOne(id) {
        const user = this.authenticationRepository.findOne(id);
        if (!user) {
            throw new exceptions_1.NotFoundException("User Not Found");
        }
        else {
            return user;
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(authentication_entity_1.Authentication)),
    __metadata("design:paramtypes", [typeorm_2.Repository, dist_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map