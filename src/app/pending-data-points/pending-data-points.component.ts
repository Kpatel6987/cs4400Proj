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
    this.dataService.acceptPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints();
    });
  }

  reject(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    this.dataService.rejectPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints();
    });
  }

}
