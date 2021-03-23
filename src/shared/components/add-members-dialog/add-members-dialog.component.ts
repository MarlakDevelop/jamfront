import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '@models/user.model';


export interface AddMembersDialogData {
  friends: UserModel[];
}

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.sass']
})
export class AddMembersDialogComponent {
  form: FormGroup;
  date: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddMembersDialogData) {
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
