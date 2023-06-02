export interface UserAccess {
    token: string;
}

export interface UserLogin {
    dni: string;
    password: string;
}

export interface UserLoginResponse {
    status: number;
    message: string;
    result: any;
}

export interface UserSignUp {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserSignUpResponse {
    status: number;
    message: string;
}

export interface UserAccountInfoResponse {
    status: number,
    message: string,
    result: any
}