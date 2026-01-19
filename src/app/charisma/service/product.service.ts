import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { OrderDetails } from '../api/order-details.model';
import { MyOrderDetails } from '../api/order.model';
import { Product } from '../api/product';
import {Menu} from "../api/menu";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private baseURL = "http://localhost:9090/api/v1/getAllProducts";
    constructor(private httpClient: HttpClient) { }
    getProductsSmall() {
        return this.httpClient.get<any>('assets/charisma/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }


    // public addProduct(product: FormData): Observable<Product>{
    //     return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
    // }


    // getProducts() {
    //     return this.http.get<any>('assets/charisma/data/products.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }
    getProducts(): Observable<Product[]>{
        return this.httpClient.get<Product[]>(`${this.baseURL}`).pipe(
            tap(data=>console.log(JSON.stringify(data))),
            catchError(this.handlerError)
        );
    }


    createProduct(product: Product): Observable<Object>{

        return this.httpClient.post(`${this.baseURL}`, product );
    }



    getProductsMixed() {
        return this.httpClient.get<any>('assets/charisma/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.httpClient.get<any>('assets/charisma/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersLarge() {
        return this.httpClient.get<any>('assets/charisma/data/products-orders.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
    handlerError(err:HttpErrorResponse){
        let errorMessage=''
        if(err.error instanceof ErrorEvent){
            errorMessage='Create errro' + err.error.message;
        }
        else{
            errorMessage='systemError';
        }
        return throwError(errorMessage)
    }
    public createTransaction(amount: string) {
        return this.httpClient.get('http://localhost:9090/createTransaction/' + amount);
    }

    // tslint:disable-next-line:typedef
    public markAsDelivered(orderId: string) {
        return this.httpClient.get('http://localhost:9090/markOrderAsDelivered/' + orderId);
    }

    public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
        return this.httpClient.get<MyOrderDetails[]>('http://localhost:9090/api/v1/getAllOrderDetails/' + status);
    }

    public getMyOrders(): Observable<MyOrderDetails[]> {
        return this.httpClient.get<MyOrderDetails[]>('http://localhost:9090/api/v1/getOrderDetails');
    }

    // tslint:disable-next-line:typedef
    public deleteCartItem(cartId: string) {
        return this.httpClient.delete('http://localhost:9090/api/v1/deleteCartItem/' + cartId);
    }

    // tslint:disable-next-line:typedef
    public addProduct(product: FormData) {
        return this.httpClient.post<Product>('http://localhost:9090/api/v1/api/v1/addNewProduct', product);
    }

    // tslint:disable-next-line:typedef
    public getAllProducts(pageNumber: string, searchKeyword: string = '') {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<Product[]>('http://localhost:9090/api/v1/getAllProducts?pageNumber=' + pageNumber + '&searchKey=' + searchKeyword); }

    // tslint:disable-next-line:typedef
    public getProductDetailsById(productId: string) {
        return this.httpClient.get<Product>('http://localhost:9090/api/v1/getProductDetailsById/' + productId);
    }

    // tslint:disable-next-line:typedef
    public deleteProduct(productId: number) {
        return this.httpClient.delete('http://localhost:9090/api/v1/deleteProductDetails/' + productId);
    }

    // tslint:disable-next-line:typedef
    public getProductDetails(isSingleProductCheckout: string, productId: string) {
        return this.httpClient.get<Product[]>('http://localhost:9090/api/v1/getProductDetails/' + isSingleProductCheckout + '/' + productId);
    }

    // tslint:disable-next-line:typedef
    public placeOrder(orderDetails: OrderDetails, isCartCheckout: string) {
        return this.httpClient.post('http://localhost:9090/api/v1/placeOrder/' + isCartCheckout, orderDetails);
    }

    // tslint:disable-next-line:typedef
    public addToCart(productId: string) {
        return this.httpClient.get('http://localhost:9090/api/v1/addToCart/' + productId);
    }

    // tslint:disable-next-line:typedef
    public getCartDetails() {
        return this.httpClient.get('http://localhost:9090/api/v1/getCartDetails');
    }

}
