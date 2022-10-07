import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  public personalForm: FormGroup;

  private subscription: Subscription;

  private STEP = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userFormService: UserFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userFormService.setSteps(this.STEP);
    this.getForm();
  }

  private getForm(): void {
    this.subscription = this.userFormService.getUserForm()
    .subscribe((form) => {
      if (form) {
        this.setFormValueIfExist(form.personalInfo);
      }
    });
  }

  private setFormValueIfExist({firstName, lastName}): void {
    this.personalForm.patchValue({
      firstName,
      lastName
    });
  }

  public onSubmit(): void {
    const data = {
      personalInfo: this.personalForm.value
    };
    this.userFormService.setUserForm(data);
    this.router.navigate(['../contact-info'], {relativeTo: this.activatedRoute});
  }

  private initForm(): void {
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.personalForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
