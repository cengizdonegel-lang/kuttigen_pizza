import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "./charisma/components/auth/auth.guard";
import {AuthInterceptor} from "./charisma/components/auth/auth.interceptor";
import {UserService} from "./charisma/service/user.service";

// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import {MatButtonModule} from "@angular/material/button";
// import {MatToolbarModule} from "@angular/material/toolbar";
// import {MatGridListModule} from "@angular/material/grid-list";
// import {MatTableModule} from "@angular/material/table";
// import {MatDialogModule} from "@angular/material/dialog";
// import {MatIconModule} from "@angular/material/icon";
// import {LoginModule} from "./charisma/components/auth/login/login.module";
// import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [

        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule, AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,

        // MatToolbarModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatGridListModule,
        // MatDialogModule,
        // BrowserAnimationsModule,
        // MatButtonModule,
        // MatTableModule,
        // MatIconModule,
        // MatDialogModule,
        // MatButtonToggleModule,
        // LoginModule
    ],
    providers:
        [ AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:AuthInterceptor,
            multi:true
        },
        UserService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
