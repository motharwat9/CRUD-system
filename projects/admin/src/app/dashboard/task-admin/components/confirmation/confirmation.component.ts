import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(
    public dialog:MatDialogRef<ConfirmationComponent>,
    public matDialog:MatDialog
  ) {}
  confirm(){
    this.matDialog.closeAll()
  }
  close(){
    this.dialog.close()
  }
}
