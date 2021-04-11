import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TextDialogComponent} from '@components/text-dialog/text-dialog.component';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-message-field-box',
  templateUrl: './message-field-box.component.html',
  styleUrls: ['./message-field-box.component.sass']
})
export class MessageFieldBoxComponent {
  @Output() setValue: EventEmitter<string> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = formBuilder.group({
        text: ['', [Validators.required, Validators.maxLength(2000)]],
      }
    );
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
  }

  send(){
    this.setValue.emit( this.form.controls['text'].value );
    this.form.reset();
  }
}
