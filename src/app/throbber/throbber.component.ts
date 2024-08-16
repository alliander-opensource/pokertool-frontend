import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-throbber',
  standalone: true,
  imports: [],
  templateUrl: './throbber.component.html',
  styleUrl: './throbber.component.scss'
})
export class ThrobberComponent {
  @Input() color = 'white';
  @Input() size = '24pt';
}
