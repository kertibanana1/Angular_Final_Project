import { AlertService } from './../../../services/alert.service';
import { WithdrawService } from './../../../services/withdraw.service';
import { RequisitionService } from './../../../services/requisition.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Users } from '../register/users';
import * as _ from 'lodash';

import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services//Authentication.service';
import { UsersAuthorityService } from 'src/app/services/users-authority.service';
@Component({
  selector: 'app-overview-withdraw-admin-detail',
  templateUrl: './overview-withdraw-admin-detail.component.html',
  styleUrls: ['./overview-withdraw-admin-detail.component.scss']
})
export class OverviewWithdrawAdminDetailComponent implements OnInit {
  withdrawCode: any;
  modalShow = false;
  withdrawList: any[];
  withdrawDetailList: any[];
  withdrawRoundList: any[];
  reqDetailList: any[];
  remain: any;
  statusRemain: any;
  date: string;
  time: any;
  rows: any = [];
  round: any;
  collapsed = true;
  currentUser: Users;
  currentUserSubscription: Subscription;
  decoded: any;
  clothRemain = '';
  uncomplete = 0;
  over = 0;
  clothOver = '';
  roundList: any = [];
  r: any = '';
  wardCheck = false;
  authority: any = [];

  constructor(
    private authenticationService: AuthenticationService,
    private withdrawService: WithdrawService,
    private reqService: RequisitionService,
    private alertService: AlertService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private users_authorityService: UsersAuthorityService,


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
    if (this.authority.seven !== 'true') {
      this.alertService.error();
      this.router.navigate(['main/main']);
    } else {
    moment.locale('th');
    this.withdrawCode = this._Activatedroute.snapshot.paramMap.get('withdrawCode');
    // console.log('withdrawCode', this.withdrawCode);
    this.getWithdraw();
    this.time = moment().add(543, 'years').format('DD MMMM YYYY');
    // console.log(this.decoded.userId);
  }
}

  async getWithdraw() {
    try {
      const result1: any = await this.withdrawService.getWithdrawByCode(this.withdrawCode);
      const results: any = await this.reqService.showReqWaitDetail(result1.rows[0].requisitionCode);
      if (results.rows) {
        if (result1.rows) {
          this.withdrawList = result1.rows;
          for (const item of this.withdrawList) {
            item.reqTime = moment(item.reqDate).format('HH:mm');
            item.reqDate = moment(item.reqDate).add(543, 'years').format('DD MMMM YYYY');
            item.totalRound += 1;
            this.round = item.totalRound;
          }
          this.date = moment(result1.rows[0].withdrawDate).add(543, 'years').format('DD MMMM YYYY');
        }
       } else {
        this.wardCheck = true;
        const result: any = await this.withdrawService.getWithdrawByCodeNapkin(this.withdrawCode);
        if (result.rows) {
          this.withdrawList = result.rows;
          for (const item of this.withdrawList) {
            const code = item.Requisition_requisitionCode;
            // console.log(code.substring(2));
            const result3: any = await this.reqService.getReqNapkin(code.substring(2));
            // console.log(result3.rows[0]);
            if (result3.rows) {
              item.reqTime = moment(result3.rows[0].reqDate).format('HH:mm');
              item.reqDate = moment(result3.rows[0].reqDate).add(543, 'years').format('DD MMMM YYYY');
              item.reqId = result3.rows[0].reqId;
              item.requisitionCode = result3.rows[0].requisitionCode;
              item.status = result3.rows[0].status;
              item.status_withdraw = result3.rows[0].status_withdraw;
            }
          }
          this.date = moment(result.rows[0].withdrawDate).add(543, 'years').format('DD MMMM YYYY');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onShow(code) {
    this.modalShow = true;
    this.rows = code;
    this.round = this.rows.totalRound + 1;
    try {
      const results: any = await this.reqService.showReqWaitDetail(code.requisitionCode);
      if (results.rows) {
        for (const row of results.rows) {
          row.amountClothWithdraw = 0;
        }
        this.reqDetailList = results.rows;
        if (this.round > 1) {
          const result1: any = await this.withdrawService.getDetailById(this.rows.withdrawCode, this.round - 1);
          const result2: any = await this.withdrawService.getDetailRound(this.rows.withdrawCode);
          if (result2.rows) {
            this.withdrawRoundList = result2.rows;
          }
          if (result1.rows) {
            this.withdrawDetailList = result1.rows;
            // console.log(this.reqDetailList, this.withdrawRoundList, this.withdrawDetailList);
            for (let i = 0; i < this.reqDetailList.length; i++) {
              this.reqDetailList[i].check = false;
              for (let j = 0; j < this.withdrawDetailList.length; j++) {
                if (this.reqDetailList[i].Cloth_clothId === this.withdrawDetailList[j].Cloth_clothId) {
                  this.reqDetailList[i].remains = this.withdrawDetailList[j].WithdrawDetail_remain;
                  this.reqDetailList[i].export =
                    this.reqDetailList[i].amountClothReal - this.withdrawDetailList[j].WithdrawDetail_remain;
                  this.reqDetailList[i].check = true;
                }
              }
            }
          }
          if (this.wardCheck === true) {
            this.reqDetailList = await _.dropWhile(this.reqDetailList, ['check', false]);
          } else {
            this.reqDetailList = await _.takeWhile(this.reqDetailList, ['check', true]);
          }

          for (let i = 0; i < this.reqDetailList.length; i++) {
            for (let j = 0; j < this.round - 1; j++) {
              this.r = 'round';
              // tslint:disable-next-line: max-line-length
              const result4: any = await this.withdrawService.getDetailByCloth(this.rows.withdrawCode, this.reqDetailList[i].Cloth_clothId, j + 1);
              this.r = this.r + j;
              const obj = {
                clothName: this.reqDetailList[i].clothName,
                round: j,
                amountCloth: result4.rows[0].amountCloth
              };
              this.roundList[i] = obj;
            }
          }
        } else {
          for (const item of this.reqDetailList) {
            item.remains = item.amountClothReal;
            item.export = 0;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

}
