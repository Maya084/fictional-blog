export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
}

interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}

interface IGeo {
    lat: string;
    lng: string;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPostPaginated {
    data: IPost[];
    page: number;
    total: number;
}

export interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
