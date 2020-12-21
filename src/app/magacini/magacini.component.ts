import { MagaciniService } from './../_services/magacini.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Magacin } from '../_model/Magacin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-magacini',
  templateUrl: './magacini.component.html',
  styleUrls: ['./magacini.component.scss']
})
export class MagaciniComponent implements OnInit {

  magacini$: Observable<Magacin[]>;
  selectedId: number;


  constructor(private magaciniService: MagaciniService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.magacini$ = this.magaciniService.getAll();


  }


}
