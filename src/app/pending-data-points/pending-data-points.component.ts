import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pending-data-points',
  templateUrl: './pending-data-points.component.html'
})
export class PendingDataPointsComponent implements OnInit {
  points;
  pointsArray;
  sortColumn: string;
  ascending: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.sortColumn = "DateStamp";
    this.ascending = true;
    this.points = this.dataService.getPendingPoints(this.sortColumn, this.ascending);
    console.log(this.pointsArray);
  }

  changeSorting(column) {
      if (column === this.sortColumn) {
          this.ascending = !this.ascending;
      } else {
          this.sortColumn = column;
          this.ascending = true;
      }
      this.points = this.dataService.getPendingPoints(this.sortColumn, this.ascending);
  }

  selectedColumn(columnName): string{
    if (this.sortColumn == columnName) {
        return this.ascending ? "glyphicon glyphicon-triangle-bottom" : "glyphicon glyphicon-triangle-top";
    } else {
        return "glyphicon glyphicon-sort";
    }
  }

  accept(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    this.dataService.acceptPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints(this.sortColumn, this.ascending);
    });
  }

  reject(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    this.dataService.rejectPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints(this.sortColumn, this.ascending);
    });
  }

}
