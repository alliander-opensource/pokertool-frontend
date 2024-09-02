import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThrobberComponent} from "../throbber/throbber.component";

@Component({
  selector: 'app-button',
  standalone: true,
    imports: [
        ThrobberComponent
    ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();
}
