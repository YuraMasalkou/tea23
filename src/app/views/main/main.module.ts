import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from "./main.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {NgbAccordion, NgbPanel, NgbPanelContent} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MainRoutingModule,
    NgbAccordion,
    NgbPanel,
    NgbPanelContent,

  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule {
}
