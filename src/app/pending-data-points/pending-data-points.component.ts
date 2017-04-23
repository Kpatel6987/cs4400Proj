/*
 * Credit for sorting functionality:
 * Cory Shaw, fueltravel.com
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { DatePipe } from '@angular/common';
import { OrderBy } from '../orderBy'

@Component({
  selector: 'app-pending-data-points',
  templateUrl: './pending-data-points.component.html',
  styleUrls: ['./pending-data-points.component.css']
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
    private orderByPipe : OrderBy
  ) { }

  ngOnInit() {
    this.pointsArray = [];
    this.points = this.dataService.getPendingPoints().subscribe((data) => this.pointsArray.push(data));
    this.sortColumn = "DateStamp";
    this.ascending = true;
    console.log(this.pointsArray);
  }

  changeSorting(column) {
      if (column === this.sortColumn) {
          this.ascending = !this.ascending;
      } else {
          this.sortColumn = column;
          this.ascending = true;
      }
  }

  selectedClass(columnName): string{
    if (this.sortColumn == columnName) {
        return this.ascending ? "glyphicon glyphicon-triangle-bottom" : "glyphicon glyphicon-triangle-top";
    } else {
        return "glyphicon glyphicon-sort";
    }
  }

  sorting() :string {
      return this.ascending ? this.sortColumn : '-' + this.sortColumn;
  }

  accept(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    this.pointsArray = [];
    this.dataService.acceptPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints().subscribe((data) => this.pointsArray.push(data));
    });
  }

  reject(point) {
    point.DateTime = this.datePipe.transform(point.DateStamp, 'yyyy-MM-dd HH:mm:ss');
    this.pointsArray = [];
    this.dataService.rejectPoint(point).subscribe(data => {
      this.points = this.dataService.getPendingPoints().subscribe((data) => this.pointsArray.push(data));
    });
  }

}
