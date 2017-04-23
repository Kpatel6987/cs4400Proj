import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../_services/utility.service';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html'
})
export class PoiListComponent implements OnInit {

  locations;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.locations = this.utilityService.getLocations();
  }

}
