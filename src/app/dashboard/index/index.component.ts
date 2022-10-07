import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { UserFormService } from 'src/app/services/user-form.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy{
  public step: number = 0;
  private subscription: Subscription;

  constructor(
    public userService: UserFormService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentStep();
    this.checkIfData();
  }

  private getCurrentStep(): void {
    this.subscription = this.userService.getSteps()
    .subscribe((step) =>  {
      this.step = step;
      this.cdr.detectChanges();
    });
  }

  private checkIfData(): void {
    this.userService.getUserForm().pipe(
      take(1)
    )
    .subscribe((data) => {
      if (!data) {
        this.router.navigate(['/']);
        this.userService.setSteps(0);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
