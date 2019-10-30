import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { IIndicator } from '../model/indicator';

@Component({
  selector: 'app-root',
  templateUrl: '../assets/img/silo_towers.svg',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  indicators: IIndicator[] = [];
  percentValue: string[] = [];
  y: number[] = [];
  height: number[] = [];

  maxHeight: number = 395;
  minY: number = 0;
  maxY: number = 230;
  
  constructor(private apiService: ApiService) { }

  // получить значения уровня жидкости в процентах
  getPercentValue(): void {
    this.percentValue = this.indicators.map(
      (dataTower, i) => {
        let valPerTower = Math.round(dataTower.value * 100 / dataTower.maxValue);
        this.setColorLineStatus(valPerTower, i+1);
        this.setFluidLevel(valPerTower, i);
        return `${valPerTower}%`;
      }
    );
  }
  //установить линию статуса в красный цвет, если уровень жидкости 0 или больше 100%;
  setColorLineStatus(valPerTower:number, idx:number):void {
    let statusLine = document.querySelector(`.status-line-${idx}`);
    if ((valPerTower > 100 || valPerTower <= 0) && !statusLine.classList.contains('warning')) {
      statusLine.classList.add('warning');
    } else {
      statusLine.classList.remove('warning');
    }
  }

  //установить уровень жидкости для всех башен
  setFluidLevel(valPerTower:number, i:number):void {
    this.height.push(this.getHeightTower(valPerTower));
    this.y.push(this.getCoordY(this.height[i]));
  }

  //получить координаты y
  getCoordY(heightTower:number):number {
    let coordY = this.maxHeight - heightTower + this.maxY;
    if (coordY < this.maxY) {
      return this.maxY;
    }
    return coordY;
  }

  //получить высоту уровня жидкости для башни
  getHeightTower(valPerTower:number):number {
    let heightTower = this.maxHeight * valPerTower/100;
    if (heightTower > this.maxHeight) {
      return this.maxHeight;
    }
    return heightTower;
  }

  ngOnInit() {
    this.apiService.getData()
      .subscribe(data => {
        this.indicators = data;
        this.getPercentValue();
      }
    );
  }
}