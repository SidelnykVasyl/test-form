import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormService } from '../../services/user-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup;

  private subscription: Subscription;
  private STEP = 1;

  constructor(
    private formBuilder: FormBuilder,
    private userFormService: UserFormService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userFormService.setSteps(this.STEP);
    this.getForm();
  }

  public onSubmit(): void {
    this.userFormService.setUserForm({
      contactInfo: {
        ...this.contactForm.value
      }
    });
    this.router.navigate(['../beneficiaries'], {relativeTo: this.activatedRouter});
  }

  private getForm(): void {
    this.subscription = this.userFormService.getUserForm()
    .subscribe((form) => {
      if (form?.contactInfo) {
        this.setFormValueIfExist(form.contactInfo);
      }
    });
  }

  private setFormValueIfExist({phone, email}): void {
    this.contactForm.patchValue({
      phone,
      email
    });
  }

  private initForm(): void {
    this.contactForm = this.formBuilder.group({
      phone: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
