import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Service/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  copy(text){
    navigator.clipboard.writeText(text);
  }

}
