import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gram-ast-mars';
  calculatedMinutes: string = "abc";

  calculate(inputDeimos, inputPhobos) {
    console.log(inputDeimos.value);
    console.log(inputPhobos.value);
  }
}
