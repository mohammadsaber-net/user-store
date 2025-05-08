import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule.forRoot({ type: 'square-spin' })
  ]
})
export class AppModule { }
