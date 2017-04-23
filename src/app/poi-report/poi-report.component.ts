import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { DatePipe } from '@angular/common';
import { OrderBy } from '../_pipes/orderBy';

@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.component.html'
})
export class PoiReportComponent implements OnInit {
  pois;
  poiArray;
  sortColumn: string;
  ascending: boolean;
  constructor(
    private locationService: LocationService,
    private datePipe: DatePipe,
    private orderByPipe: OrderBy
  ) { }

  ngOnInit() {
    this.poiArray = [];
    this.pois = this.locationService.poiReport().subscribe((data) => this.poiArray.push(data));
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

  isFlagged(poi) :string{
      return poi.Flag ? "glyphicon glyphicon-flag" : "";
  }
}
