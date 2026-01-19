import {MenuItems} from "./MenuItems";

export interface  Menu {
    menu_id: number;
    label:string;
    icon:string;
    permission:string;
    routerLink: string;
    menuItems: MenuItems[];
}

