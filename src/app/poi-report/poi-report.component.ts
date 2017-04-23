import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { DatePipe } from '@angular/common';
import { OrderBy } from '../_pipes/orderBy';

@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.component.html',
  styleUrls: ['./poi-report.component.css']
})
export class PoiReportComponent implements OnInit {
  pois;
  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.pois = this.locationService.poiReport();
  }

}
