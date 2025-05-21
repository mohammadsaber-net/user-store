import { Routes } from '@angular/router';
import { ProductsComponent } from './product/products/products.component';
import { CartsComponent } from './cart/carts/carts.component';
import { ProductdetailsComponent } from './product/productdetails/productdetails.component';
import { RegisterComponent } from './auth/register/register.component';
import { CardComponent } from './auth/card/card.component';
import { cartGuard, gaurdGuard } from './gaurd.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: "products", pathMatch: "full" },
    { path: "register", canActivate: [gaurdGuard], component: RegisterComponent, title: "register" },
    { path: "products", component: ProductsComponent, title: "products" },
    { path: "payment", canActivate: [cartGuard], component: CardComponent, title: "payment" },
    { path: "carts", component: CartsComponent, title: "carts" },
    { path: "productdetails/:id", component: ProductdetailsComponent, title: "products" },
    { path: "**", component: NotFoundComponent, title: "invalid" },
];