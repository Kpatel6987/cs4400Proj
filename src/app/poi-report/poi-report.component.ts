import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.component.html'
})
export class PoiReportComponent implements OnInit {
  pois;
  sortColumn: string;
  ascending: boolean;
  constructor(
    private locationService: LocationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.sortColumn = "numPoints";
    this.ascending = false;
    this.pois = this.locationService.poiReport(this.sortColumn, this.ascending);
  }

  changeSorting(column) {
      if (column === this.sortColumn) {
          this.ascending = !this.ascending;
      } else {
          this.sortColumn = column;
          this.ascending = true;
      }
      this.pois = this.locationService.poiReport(this.sortColumn, this.ascending);
  }

  selectedColumn(columnName): string{
    if (this.sortColumn == columnName) {
        return this.ascending ? "glyphicon glyphicon-triangle-bottom" : "glyphicon glyphicon-triangle-top";
    } else {
        return "glyphicon glyphicon-sort";
    }
  }

  isFlagged(poi) :string{
      return poi.Flag ? "glyphicon glyphicon-flag" : "";
  }
}
