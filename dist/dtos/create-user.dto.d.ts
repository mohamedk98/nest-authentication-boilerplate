export declare enum USERTYPE {
    ADMIN = 0,
    STUDENT = 1,
    LECTURER = 2,
    CUSTOMERSUPPORT = 3
}
export declare class CreateUserDto {
    email: string;
    password: string;
    userType: USERTYPE;
}
