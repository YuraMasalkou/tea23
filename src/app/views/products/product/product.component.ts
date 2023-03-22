import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: ProductType;
  private subscription: Subscription | null = null;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.subscription = this.http.get<ProductType>('https://testologia.site/tea?id=' + params['id'])
          .subscribe(
            {
              next: (data) => {
                this.product = data;
              },
              error: (error) => {
                console.log(error);
                this.router.navigate(['/']);
              }
            }
          );
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}



