export type UserModel = {
    id:       number;
    name:     string;
    email:    string;
    password: string;
    phone:    string;
    birthday: string;
    avatar:   null;
    gender:   boolean;
    role:     string;
}

export type LoginModel = {
    email: string;
    password: string;
}