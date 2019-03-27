import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule,MatInputModule,MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [],
  exports :[
     MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
