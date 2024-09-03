import { Component, inject, OnInit } from '@angular/core';
import { ApplicationService } from '../../service/application.service';
import { Application } from '../../model/class/application';
import { IResponse } from '../../model/interface/response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css',
})
export class ApplicationListComponent implements OnInit {
  applicationService = inject(ApplicationService);

  applicationList: Application[] = [];

  ngOnInit(): void {
    this.getAllApplication();
  }

  getAllApplication() {
    this.applicationService.getAllApplication().subscribe(
      (res: IResponse) => {
        if (res.result) {
          this.applicationList = res.data;
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }
}
