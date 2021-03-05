import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubmitDialogComponent } from '../../../shared/components/submit-dialog/submit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent {
  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
      }
    );
  }

  openLogoutSubmitDialog(text: string): void {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: {
        text
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.logout(); }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
