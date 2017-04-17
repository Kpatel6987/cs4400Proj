import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';

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
    private dataService: DataService
  ) { }

  ngOnInit() {
    //this.points = this.dataService.getPendingPoints();
  }

  accept(point) {
    //this.dataService.acceptPoint(point);
  }

  reject(point) {
    //this.dataService.rejectPoint(point);
  }

}
