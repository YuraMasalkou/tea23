import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-z]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d*[0-9]{11,11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: [''],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-Za-яА-Я0-9+ -/]*$')]],
    comment: [''],
  })
  successResponse: boolean = true;
  cleanForm: boolean | undefined;
  private subscription: Subscription | null = null;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.checkoutForm.controls.product.setValue(params['product']);
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createOrder() {
    if (this.checkoutForm.controls.name.value && !this.checkoutForm.controls.name.invalid && this.checkoutForm.controls.last_name.value && !this.checkoutForm.controls.last_name.invalid
      && this.checkoutForm.controls.phone.value && !this.checkoutForm.controls.phone.invalid &&
      this.checkoutForm.controls.country.value && !this.checkoutForm.controls.country.invalid &&
      this.checkoutForm.controls.zip.value && !this.checkoutForm.controls.zip.invalid &&
      this.checkoutForm.controls.product.value &&
      this.checkoutForm.controls.address.value && !this.checkoutForm.controls.address.invalid) {
      this.subscription?.add(this.http.post<{ success: boolean, message?: string }>('https://testologia.site/order-tea', {
        name: this.checkoutForm.controls.name.value,
        last_name: this.checkoutForm.controls.last_name.value,
        phone: this.checkoutForm.controls.phone.value,
        country: this.checkoutForm.controls.country.value,
        zip: this.checkoutForm.controls.zip.value,
        product: this.checkoutForm.controls.product.value,
        address: this.checkoutForm.controls.address.value,
        comment: this.checkoutForm.controls.comment.value
      })
        .subscribe(response => {
          if (response.success && !response.message) {
            this.successResponse = true;
            this.cleanForm = true;
            this.checkoutForm.reset();
            let nameInput: HTMLElement | null = document.getElementById('forms-input');
            if (nameInput) {
              nameInput.style.display = 'none';
            }
          } else {
            this.successResponse = false;
          }
        }))
    } else {
      alert('Заполните верно все поля')
    }
  }
}
