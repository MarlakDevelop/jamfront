import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ChatDialogData {
  title: string;
  image: string;
  name: string;
  buttonSubmitText: string;
  buttonDoNothingText: string;
}

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.sass']
})
export class ChatDialogComponent {
  form: FormGroup;
  date: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ChatDialogData, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        image: [data.image],
        name: [data.name, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
      }
    );
    this.date = new Date();
  }

  loadImage(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.controls['image'].setValue(reader.result);
    };
  }
}
