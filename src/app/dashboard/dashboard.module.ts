import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInformationComponent } from './peronal-information/personal-information.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    IndexComponent,
    PersonalInformationComponent,
    ContactInformationComponent,
    BeneficiariesComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    NgxMatIntlTelInputModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class DashboardModule { }
