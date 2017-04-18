import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pending-data-points',
  templateUrl: './pending-data-points.component.html',
  styleUrls: ['./pending-data-points.component.css']
})
export class PendingDataPointsComponent implements OnInit {
  points;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.points = this.dataService.getPendingPoints();
  }

  accept(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    console.log(point.DateTime);
    this.dataService.acceptPoint(point).subscribe(data => {
      console.log(data)
      this.router.navigate["/home"];
    });
  }

  reject(point) {
    this.dataService.rejectPoint(point).subscribe(data => {
      console.log(data);
      alert("Success");
      this.router.navigate["/home"];
    });
  }

}
