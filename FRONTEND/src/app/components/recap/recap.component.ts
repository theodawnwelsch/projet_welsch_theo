import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../models/users';


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  @Input() newUser : Users = {} as Users;
  constructor() { }

  ngOnInit(): void {
  }

}
