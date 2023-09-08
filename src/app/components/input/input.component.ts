import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IInputEventProps {
  value: string;
  inputName: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder?: string = '';
  @Input() icon: string | undefined;
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() name!: string;
  @Input() isRequired: boolean = false;

  value: string = '';

  @Output() onChange: EventEmitter<IInputEventProps> = new EventEmitter();

  handleChange() {
    return this.onChange.emit({ value: this.value, inputName: this.name });
  }
}
