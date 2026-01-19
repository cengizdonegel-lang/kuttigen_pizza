import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/charisma/api/product';
import { ProductService } from 'src/app/charisma/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FileHandle} from "../../../api/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {
    isNewProduct = true;

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product= {
        category: "",
        code: "",
        description: "",
        id: "",
        image: [],
        inventoryStatus: undefined,
        name: "",
        price: 0,
        quantity: 0,
        rating: 0
    };

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService) { }

    ngOnInit() {

            this.productService.getProducts().subscribe(data => {
                this.products = data;
                    if(this.products ) {
                        this.isNewProduct = false;
                    }
            });




        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {
            category: "",
            code: "",
            description: "",
            id: "",
            image: [],
            inventoryStatus: undefined,
            name: "",
            price: 0,
            quantity: 0,
            rating: 0
        };
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {
            category: "",
            code: "",
            description: "",
            id: "",
            image: [],
            inventoryStatus: undefined,
            name: "",
            price: 0,
            quantity: 0,
            rating: 0
        };
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    prepareFormDataForProduct(product: Product): FormData {
        const uploadImageData = new FormData();
        uploadImageData.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        // @ts-ignore
        for (var i = 0; i < this.product.image.length; i++) {
            //
            // uploadImageData.append(
            //     "imageFile",
            //     this.product.image[i].file,
            //     this.product.image[i].file.name
            // );
        }
        return uploadImageData;
    }
    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                // this.product.image ?| = 'product-placeholder.svg';
                // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                // this.products.push(this.product);

                const formData = this.prepareFormDataForProduct(this.product);
                console.log("Crud Yapimiz:"+formData);
                this.productService.addProduct(formData).subscribe(
                    (response: Product) => {
                        this.product.image = [];
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error);
                    }
                );


                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {
                category: "",
                code: "",
                description: "",
                id: "",
                image: [],
                inventoryStatus: undefined,
                name: "",
                price: 0,
                quantity: 0,
                rating: 0
            };
        }
    }

    onFileSelected(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileHandle: FileHandle = {
                file: file,
                url: this.sanitizer.bypassSecurityTrustUrl(
                    window.URL.createObjectURL(file)
                ),
            };
            // @ts-ignore
            this.product.image.push(fileHandle);
        }
    }

    removeImages(i: number) {
        // @ts-ignore
        this.product.image.splice(i, 1);
    }

    fileDropped(fileHandle: FileHandle) {
        // @ts-ignore
        this.product.image.push(fileHandle);
    }
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
