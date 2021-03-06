import { Component, OnInit } from '@angular/core';
import { StockService } from './../../../services/stock.service';
import { WareHouseService } from './../../../services/wareHouse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services//Authentication.service';
import { UsersAuthorityService } from 'src/app/services/users-authority.service';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  clothList: any[];
  clothTypeList: any[];
  clothType1List: any[] = [];
  modalEdit = false;
  currentRow: any;
  editRow: any;
  stock: any = [];
  notHave = 0;
  title = 'angularselect2';
  currentUser: any;
  currentUserSubscription: Subscription;
  decoded: any ;
  authority: any = [];

  constructor(
    private alertService: AlertService,
    private router: Router,
    private stockService: StockService,
    private wareHouseService: WareHouseService,
    private _Activatedroute: ActivatedRoute,
    private users_authorityService: UsersAuthorityService,
    private authenticationService: AuthenticationService,

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(users => {
      this.currentUser = users;
      this.decoded = jwt_decode(users.token);
  });
   }

  async ngOnInit() {
    const result: any = await this.users_authorityService.getById(this.decoded.userId);
    // console.log('result.rows' , result);
    for (const item of result.rows) {
      if (item.aId === 1) {
        this.authority.one = 'true';
      } if (item.aId === 2) {
        this.authority.two = 'true';
      } if (item.aId === 3) {
        this.authority.three = 'true';
      } if (item.aId === 4) {
        this.authority.four = 'true';
      } if (item.aId === 5) {
        this.authority.five = 'true';
      } if (item.aId === 6) {
        this.authority.six = 'true';
      } if (item.aId === 7) {
        this.authority.seven = 'true';
      } if (item.aId === 8) {
        this.authority.eigth = 'true';
      } if (item.aId === 9) {
        this.authority.nine = 'true';
      } if (item.aId === 10) {
        this.authority.ten = 'true';
      }
    }
    if (this.authority.five !== 'true') {
      this.alertService.error();
      this.router.navigate(['main/main']);
    } else {
    await this.getWareHouse();
    await this.getClothType();
    }
  }

  async getWareHouse() {
    try {
      const result1: any = await this.stockService.getCloth();
      this.stock = result1.rows;
      for (const item of this.stock) {
        const result: any = await this.wareHouseService.getWareHouse(item.clothId);
        if (result.rows.length === 0) {
          item.warehouseAmount = 0;
        } else {
          item.warehouseAmount = result.rows[0].warehouseAmount;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getClothType() {
    try {
      const result: any = await this.stockService.getClothType();
      if (result.rows) {
        this.clothTypeList = result.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async letSearch(search) {
    try {
      const result: any = await this.wareHouseService.getSearch(search);
      if (result.rows) {
        this.stock = result.rows;
      }
    } catch (error) {
      console.log(error);
    }
}

  onAdd(row) {
    this.currentRow = Object.assign({}, row);
    this.currentRow = {
      clothId: this.currentRow.clothId,
      clothName: this.currentRow.clothName,
      warehouseAmount: this.currentRow.warehouseAmount
    };
    this.currentRow.mode = 'add';
    this.modalEdit = true;
    if (this.currentRow.warehouseAmount === 0) {
      this.notHave = this.notHave + 1;
    } else {
      this.notHave = 0;
    }
  }

  async onSave() {

    const result: any = await this.wareHouseService.getWareHouse( this.currentRow.clothId);
    console.log(result.rows);

    if (this.notHave === 1 && result.rows.length === 0) {
      const obj = {
        Cloth_clothId: this.currentRow.clothId,
        warehouseAmount: this.currentRow.warehouseAmount,
      };

      try {
          const result: any = await this.wareHouseService.insertWareHouse(obj);
          console.log('result.rows', result.rows);

          if (result.rows) {
            this.alertService.success('บันทึกสำเร็จ').then(value => {
              if (value.dismiss) {
                this.getWareHouse();
                this.modalEdit = false;
                this.router.navigate(['main/warehouse']);
                this.notHave = 0;

              }
            });
          } else {
            this.alertService.error('เกิดข้อผิดพลาด');

        }
      } catch (err) {
        console.log(err);
      }
    } else {

      const obj = {
        warehouseAmount: this.currentRow.warehouseAmount,
      };
      try {
          const result: any = await this.wareHouseService.updateWareHouse(this.currentRow.clothId, obj);
          if (result.rows) {
            this.alertService.success('บันทึกสำเร็จ').then(value => {
              if (value.dismiss) {
                this.getWareHouse();
                this.modalEdit = false;
                this.router.navigate(['main/warehouse']);
                this.notHave = 0;

              }
            });
          } else {
            this.alertService.error('เกิดข้อผิดพลาด');

        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
