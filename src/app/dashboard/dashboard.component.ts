import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_service/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allBranches:any;
  constructor(
    private commonservice: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllBranches();
   
  }
	async getAllBranches() {
		this.commonservice.getAllBranches().subscribe(res => {
			this.allBranches = res;
			debugger;
		})
	}
}
