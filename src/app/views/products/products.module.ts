import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CatalogComponent} from "./catalog/catalog.component";
import {InfoComponent} from "./info/info.component";
import {ProductComponent} from "./product/product.component";


@NgModule({
  declarations: [
    CatalogComponent,
    InfoComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}
