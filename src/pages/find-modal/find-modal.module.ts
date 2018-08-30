import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindModalPage } from './find-modal';
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
  declarations: [
    FindModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FindModalPage),

    //import needed at this point because of lazy loading
    SelectSearchableModule
  ],
})
export class FindModalPageModule {}
