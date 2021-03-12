import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface TextDialogData {
  text: string;
}

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.sass']
})
export class TextDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TextDialogData) {}
}
