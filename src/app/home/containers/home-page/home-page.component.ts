import { SideBarItem } from './../../../shared/SideBarContent';
import { SideBarContentService } from './../../../shared/services/sidebarContentService.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public sideBarItems: SideBarItem[];
  constructor(private sideBarContentService: SideBarContentService) { }

  ngOnInit() {
    this.sideBarContentService.homeController = this;
  }

  ngAfterContentChecked() {
    this.sideBarItems = this.sideBarContentService.sideBarItems;
  }
  // sideBarItemsUpdated(updatedItems: SideBarItem[]) {
    
  //   console.log('Updated sidebar items' + updatedItems);
  // }
}
