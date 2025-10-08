export type User = {
    id: string;
    fullName: string;
    email: string;
    dateOfBirth: string;
    phone: string;
    password: string;
    status: number;
    activeCode?: string;
    isActive: boolean;
    forgotPasscode?: string;
    isDeleted: false;
    createdDate: string;
    roles: string[];
};