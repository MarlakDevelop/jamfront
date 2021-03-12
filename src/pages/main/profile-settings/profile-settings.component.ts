import { Component, OnDestroy, OnInit } from '@angular/core';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { MessageModel } from '@models/chats.model';
import { AuthService } from '@services/auth.service';
import { ProfileSettingsService } from '@services/profile-settings.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubmitDialogComponent } from '@components/submit-dialog/submit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  message: MessageModel;

  constructor(private authService: AuthService, private profileSettingsService: ProfileSettingsService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = formBuilder.group({
        image: [''],
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
      }
    );
  }

  ngOnInit() {
    this.loadDataAboutMe();
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  loadAvatar(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.controls['image'].setValue(reader.result);
    };
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
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

  loadDataAboutMe(): void {
    this.aSub = this.profileSettingsService.getMe().subscribe(
      res => {
        this.message = res.user;
        this.form.controls['username'].setValue(this.message.username);
        this.message.text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, deleniti dicta dolor expedita illo natus, praesentium quis quisquam, repellat sit totam velit. A ab aliquid asperiores at beatae commodi culpa cumque deleniti deserunt dignissimos dolore ducimus est eum excepturi expedita illum, inventore labore nemo nesciunt non officiis perferendis quae quod ratione reiciendis repellat rerum suscipit totam ullam, voluptatibus. Accusantium alias amet consequatur corporis, deleniti distinctio dolores, maxime nihil officia quae quas rerum? Eos illum odio officia quos repudiandae. Aspernatur eveniet excepturi id illo illum incidunt laudantium minus possimus, provident quae quibusdam quisquam sed ullam? Illum ipsa nemo porro possimus vero.';
        this.message.date = new Date();
        },
      err => this.openDialog('Произошла ошибка во время загрузки данных')
    );
  }

  updateDataAboutMe(): void {
    console.log(this.form.value);
    this.aSub = this.profileSettingsService.updateMe(this.form.value).subscribe(
      res => {
        this.form.controls['image'].setValue('');
        this.message = res.user;
        this.form.controls['username'].setValue(this.message.username);
        this.message.text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, deleniti dicta dolor expedita illo natus, praesentium quis quisquam, repellat sit totam velit. A ab aliquid asperiores at beatae commodi culpa cumque deleniti deserunt dignissimos dolore ducimus est eum excepturi expedita illum, inventore labore nemo nesciunt non officiis perferendis quae quod ratione reiciendis repellat rerum suscipit totam ullam, voluptatibus. Accusantium alias amet consequatur corporis, deleniti distinctio dolores, maxime nihil officia quae quas rerum? Eos illum odio officia quos repudiandae. Aspernatur eveniet excepturi id illo illum incidunt laudantium minus possimus, provident quae quibusdam quisquam sed ullam? Illum ipsa nemo porro possimus vero.';
        this.message.date = new Date();
      },
      err => this.openDialog('Имя пользователя занято или ваша новая ава настолько большая, что не уместилась на сервере')
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
