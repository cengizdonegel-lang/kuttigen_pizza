import {FileHandle} from "./file-handle.model";


interface InventoryStatus {
    inventoryStatus_id?:number;
    label?: string;
    value?: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: FileHandle[] ;
    rating?: number;
}
