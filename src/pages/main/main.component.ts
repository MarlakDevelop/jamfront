import { Component, OnInit } from '@angular/core';
import { SocketService } from '@services/socket.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.initSocket();
  }
}
