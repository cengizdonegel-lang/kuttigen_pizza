export class Blog {

    id?: number;
    name?: string;
    coverImage?: any;
    profile?: any;
    title?: string;
    description?: string;
    comment?: number;
    share?: number;
    day?: string;
    month?: string;
    code?: string;
    status?: string;
    tags?: string[];
}

export interface Comment {
    image?: string;
    name?: string;
    date?: string;
    description?: string;
}
