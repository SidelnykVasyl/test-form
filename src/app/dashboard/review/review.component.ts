import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserFormService } from 'src/app/services/user-form.service';
import { Beneficiaries } from '../../interfaces/beneficiaries';
import { ContactInfo, PersonalInfo } from '../../interfaces/user-form';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy{
  public beneficiariesArr: Beneficiaries[];
  public contactForm: ContactInfo;
  public personalForm: PersonalInfo;
  public form: FormGroup;

  private STEP = 3;
  private subscription: Subscription;

  constructor(
    private userFormService: UserFormService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userFormService.setSteps(this.STEP);

    this.getFinalForm();
  }

  private getFinalForm(): void {
    this.subscription = this.userFormService.getUserForm()
    .subscribe(({beneficiaries, contactInfo, personalInfo}) => {
      this.contactForm = contactInfo;
      this.personalForm = personalInfo;
      this.beneficiariesArr = beneficiaries;
      this.initForm();
    });
  }

  private createBenefiaries(): any {
    this.beneficiariesArr.forEach((el) => {
      this.beneficiaries.push(
        this.fb.group({
          name: [el.name],
          snn: [el.snn],
          percent: [el.percent],
          dob: [el.dob],
          optional: [el.optional],
          relationship: [el.relationship]
        }
      ));
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [this.personalForm.firstName],
      lastName: [this.personalForm.lastName],
      email: [this.contactForm.email],
      phone: [this.contactForm.phone],
      beneficiaries: this.fb.array([])
    });
    this.createBenefiaries();
  }

  get beneficiaries(): FormArray{
    return this.form.get('beneficiaries') as FormArray;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
