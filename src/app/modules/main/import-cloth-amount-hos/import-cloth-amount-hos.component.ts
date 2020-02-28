import { DamageService } from './../../../services/damage.service';
import { ImportDetailAmountService } from './../../../services/import-detail-amount.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { StockService } from 'src/app/services/stock.service';
import { InputArray } from '../requisition/inputArray';
import * as _ from 'lodash';


@Component({
  selector: 'app-import-cloth-amount-hos',
  templateUrl: './import-cloth-amount-hos.component.html',
  styleUrls: ['./import-cloth-amount-hos.component.scss']
})
export class ImportClothAmountHosComponent implements OnInit {

  ImportCloth_importCode: any;
  month: any;
  year: any;
  clothList: any = [];
  day: string;
  pee: string;
  amount: any;
  val = 0;
  dummy: any = [];
  arrayList: Array<InputArray> = [];
  importList: any[] = [{
    clothId: '1',
    damageAmount: 0
  }];

  constructor(
    private alertService: AlertService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private importDetailAmountService: ImportDetailAmountService,
    private damageService: DamageService
  ) { }

  async ngOnInit() {
    this.ImportCloth_importCode = this._Activatedroute.snapshot.paramMap.get('importClothCode');
    console.log('im', this.ImportCloth_importCode);
    moment.locale('th');
    this.checkYear();
    this.getCloth();
    this.day = moment().format('DD MMMM');
    this.pee = moment().add(543, 'years').format('YYYY');
  }

  async checkYear() {
    this.month = moment().format('MM');
    // tslint:disable-next-line: radix
    if (parseInt(this.month) > 9) {
      this.year = moment().add(543, 'years').format('YYYY');
    } else {
      this.year = moment().add(542, 'years').format('YYYY');
    }
  }

  async getCloth() {
    try {
      const result: any = await this.stockService.getCloth();
      if (result.rows) {
        this.clothList = result.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClickSubmit(formData) {
    // console.log(formData);
    if (formData.amount < 1) {
      this.alertService.error('จำนวนรายการผ้าที่สั่งซื้อไม่ถูกต้อง');
    } else {
      this.amount = formData.amount;
      for (let i = 0; i < this.amount; i++) {
        const arrayId = new InputArray();
        this.importList.push({
          clothId: '1',
          damageAmount: 0
        });
        arrayId.id = i + 1;
        this.arrayList.push(arrayId);
      }
      // console.log('arraylist', this.arrayList);
    }
    this.amount = 0;
  }

  async addNewRow() {
    await this.importList.push({
      clothId: '1',
      damageAmount: 0
    });
  }

  async onDelete(rowNo) {
    const result: any = await this.alertService.confirm('ยืนยันการลบ ?');
    if (result.value) {
      const data: any = [];
      this.importList.forEach((row, index) => {
        if (rowNo !== index) {
          data.push(row);
        }
      });
      this.importList = data;
    }
  }

  async onSave() {
    console.log(this.importList);
    let i = 0;
    // this.dummy = this.importList;
    // for (let i = 0; i < this.importList.length; i++) {
    //   for(let j=0; j<this.dummy.length; j++){
    //     if(this.importList[i].clothId === this.dummy[j].clothId){
    //       console.log(this.dummy[j].clothId);
    //     }
    //   }
    // }

    let unRepeat = 0;
    let dumNum = 0;
    let purchNum = 0;
    let intersect = 0;
    this.val = 0;

    for (let i = 0; i < this.importList.length; i++) {
      this.dummy[i] = this.importList[i].clothId;
    }
    purchNum = _.size(this.importList);
    dumNum = _.size(_.uniq(this.dummy));
    if (dumNum < purchNum) {
      console.log('มีผ้าซ้ำ');
      unRepeat = unRepeat + 1;
      console.log('this.unRepeat', unRepeat);
    } else {
      console.log('ไม่มีผ้าซ้ำ');
    }
    if (unRepeat !== 0) {
      this.alertService.error('กรุณาตรวจสอบรายการผ้าซ้ำ');
    } else {
      let j = 0;
      for (let i = 0; i < this.importList.length; i++) {
        j++;
        if (this.importList[i].damageAmount === null || this.importList[i].damageAmount === undefined || this.importList[i].damageAmount === '') {
          this.alertService.error('รายการที่ ' + j + ' ไม่มีจำนวนผ้า');
          this.val++;
        }
        if (this.importList[i].damageAmount < 0 || this.importList[i].damageAmount === 0) {
          this.alertService.error('รายการที่ ' + j + ' จำนวนผิดพลาด');
          this.val++;
        }
      }
    
    if (this.val === 0) {
      for (let i = 0; i < this.importList.length; i++) {
        const data = {
          damageAmount: this.importList[i].damageAmount,
          Cloth_clothId: this.importList[i].clothId,
          damageDate: moment().format('YYYY-MM-DD'),
          ImportCloth_importCode: this.ImportCloth_importCode
        };
        try {
          const result: any = await this.damageService.insertDamage(data);
          if (result.rows) {
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (this.val === 0) {
      await this.alertService.success('บันทึกรายการสำเร็จ');
      this.router.navigate(['main/export-cloth-detail/']);
    }
  }
}

}