import { Observable } from 'rxjs';
import { MagaciniService } from './../_services/magacini.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Magacin } from '../_model/Magacin';
import { Location } from '@angular/common';

@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.scss']
})
export class MagacinComponent implements OnInit {

  magacin$: Observable<Magacin>;

  constructor(
    private route: ActivatedRoute,
    private magacinService: MagaciniService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMagacin();
  }

  getMagacin(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.magacin$ = this.magacinService.getMagacin(id);
  }

}
