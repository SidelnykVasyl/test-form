import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormService } from 'src/app/services/user-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public total: number = 0;
  public MAX_VALUE = 100;
  public isDisabled = false;

  private STEP = 2;
  private subscription: Subscription;
  private beneficiariesArr = [];
  constructor(
    private fb: FormBuilder,
    private userFormService: UserFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userFormService.setSteps(this.STEP);
    this.getBeneficiaries();
    this.onPercentChange();
  }

  public goFinalStep(): void {
    this.setBeneficiaries();
    this.router.navigate(['../review'], {relativeTo: this.activatedRoute});
  }

  public setBeneficiaries(): void {
    this.userFormService.setUserForm({
        ...this.form.value
    });
  }

  public remove(index: number): void {
    if (index === 0 ) {
      this.beneficiaries.controls[index].patchValue({
        name: '',
        snn: '',
        dob: '',
        optional: '',
        relationship: '',
        percent: '',
      });
    } else {
      this.beneficiaries.removeAt(index);
      this.beneficiariesArr = this.beneficiariesArr.splice(index, 1);
      this.calcTotal();
    }
  }

  private getBeneficiaries(): void {
    this.userFormService.getUserForm().pipe(
      take(1),
      filter((res) => !!res)
    )
    .subscribe(({beneficiaries}) => {
      if (beneficiaries) {
        this.beneficiariesArr = beneficiaries;
        this.setBenefiaries();
        this.calcTotal();
      }else {
        this.beneficiaries.push(this.createBenefiaries());
      }
    });
  }

  private calcTotal(): void {
    this.total = this.beneficiariesArr.reduce((prev, curr) => Number(curr.percent) + prev, 0);
  }

  public addBeneficiaries(): void {
    this.beneficiariesArr = this.form.value.beneficiaries;
    this.calcTotal();
    if (this.form.valid && this.total !== this.MAX_VALUE) {
      this.beneficiaries.push(this.createBenefiaries());
    }
  }

  private onPercentChange(): void {
    this.form.valueChanges.subscribe(({beneficiaries}) => {
      const total = beneficiaries.reduce((prev, curr) => prev + Number(curr.percent), 0);
      this.isDisabled = total > 100;
    });
  }

  private setBenefiaries(): void {
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


  private createBenefiaries(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      snn: ['SNN', Validators.required],
      percent: ['', [Validators.max(100), Validators.required]],
      dob: ['', Validators.required],
      optional: [''],
      relationship: ['Trust', Validators.required]
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      beneficiaries: this.fb.array([])
    });
  }

  get beneficiaries(): FormArray{
    return this.form.get('beneficiaries') as FormArray;
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
