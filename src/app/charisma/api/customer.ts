import {Address} from "./address";

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    company?: string;
    date?: string;
    status?: string;
    verified?: string;
    activity?: number;
    balance?: string;
    representative?: Representative;
    country?: Country;
    address?: Address;


}
