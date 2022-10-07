import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { IndexComponent } from './index/index.component';
import { PersonalInformationComponent } from './peronal-information/personal-information.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full'
      },
      {
        path: 'personal-info',
        component: PersonalInformationComponent
      },
      {
        path: 'contact-info',
        component: ContactInformationComponent
      },
      {
        path: 'beneficiaries',
        component: BeneficiariesComponent
      },
      {
        path: 'review',
        component: ReviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
