import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../../types/product.type";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  loading: boolean = true;
  private subscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.http.get<ProductType[]>('https://testologia.site/tea')
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            this.loading = false;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
