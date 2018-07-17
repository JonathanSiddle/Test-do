import { SideBarItem } from './../SideBarContent';
import { Injectable } from '@angular/core';
import { HomePageComponent } from '../../home/containers/home-page/home-page.component';

@Injectable()
export class SideBarContentService {
    public homeController: HomePageComponent;
    public sideBarItems: SideBarItem[];

    constructor() {}

    setSideBarContent(content: SideBarItem[]) {
        this.sideBarItems = content;
    }
}
