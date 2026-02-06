export interface User{
    id: string;
    name: string;
    university: string;
    email: string;
    role: 'admin' | 'coach' | 'athlete';
    permissions: string[];
}