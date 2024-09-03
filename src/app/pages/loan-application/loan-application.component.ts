import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Application, Loan } from '../../model/class/application';
import { IResponse } from '../../model/interface/response';
import { ApplicationService } from '../../service/application.service';
import { AlertComponent } from '../../components/resuable/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.css',
})
export class LoanApplicationComponent implements OnDestroy {
  application: Application = new Application();
  loan: Loan = new Loan();

  alertType: string = '';
  alertText: string = '';

  applicationService = inject(ApplicationService);

  ngOnDestroy(): void {
    this.alertText = '';
  };

  addLoan() {
    const strObj = JSON.stringify(this.loan);
    const newObj = JSON.parse(strObj);
    this.application.Loans.unshift(newObj);
    this.loan = new Loan();
  }

  onSubmit() {
    this.applicationService.addNewApplication(this.application).subscribe(
      (res: IResponse) => {
        if (res.result) {
          this.alertType = 'alert-success';
          this.alertText = 'Application submitted successfully!';
          this.application = new Application();
        } else {
          this.alertType = 'alert-danger';
          this.alertText = res.message;
        }
      },
      (error) => {
        this.alertType = 'alert-danger';
        this.alertText = 'An error occurred: ' + error;
        console.log(error);
      }
    );
  }
}
