import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface SubmitDialogData {
  text: string;
}

@Component({
  selector: 'app-text-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.sass']
})
export class SubmitDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SubmitDialogData) {}
}
