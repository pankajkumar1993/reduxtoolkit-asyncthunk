export interface UserProps {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
}

export interface initialStateProps {
    users: UserProps[];
    loading: boolean;
    status: "idle" | "success" | "pending" | "failed",
    error: undefined | string;
    searchData: UserProps[];
    selectedUser: UserProps | null
}




export interface ApiResponse {
    users: UserProps[];
}

export interface RejectError {
    message: string;
}


export interface IconProps {
    size?: number;
    fill?: string;
    className?: string
}



export interface AuthUserProfile {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    image: string,
}



export interface AuthState {
    loading: boolean;
    userInfo: AuthUserProfile | null;
    userToken: string | null;
    error: string | undefined;
    success: boolean;
    isAuthenticated: boolean
}
