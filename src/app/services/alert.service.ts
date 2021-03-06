import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  error(text = 'เกิดข้อผิดพลาด', title = 'เกิดข้อผิดพลาด') {
    return Swal.fire({
      title: title,
      text: text,
      type: 'error',
      confirmButtonText: 'ปิด'
    });
  }

  success(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย',
      showConfirmButton: false,
      timer: 1500
    });
  }

  successApprove(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'อนุมัติการเบิกเสร็จสิ้น',
      showConfirmButton: false,
      timer: 1500
    });
  }

  successNotApprove(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'ไม่อนุมัติรายการนี้',
      showConfirmButton: false,
      timer: 1500
    });
  }

  successNotApproveReq(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'ไม่อนุมัติใบเบิกนี้',
      showConfirmButton: false,
      timer: 1500
    });
  }

  editSuccess(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'แก้ไขสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    });
  }

  deleteSuccess(text = 'สำเร็จ', title = 'congrate') {
    return Swal.fire({
      type: 'success',
      title: 'ลบสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    });
  }

  notFoundUser(text = 'not found user', title = ':-(') {
    return Swal.fire('Not found user!');
  }

  confirm(title = 'ยืนยันการทำรายการ ?') {
    return Swal.fire({
      title: title,
      text: 'คุณแน่ใจหรือไม่ ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    });
  }

  newyear() {
    return Swal.fire({
      title: 'ขึ้นปีงบประมาณใหม่',
      text: 'คุณแน่ใจหรือไม่ ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    });
  }

  delete() {
    return Swal.fire({
      title: 'ลบรายชื่อนี้',
      text: 'คุณแน่ใจหรือไม่ ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    });
  }
  restore() {
    return Swal.fire({
      title: 'คืนสถานะการลา',
      text: 'คุณแน่ใจหรือไม่ ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    });
  }

approve(text = 'สำเร็จ', title = 'congrate') {
  return Swal.fire({
    title: 'ยืนยันการอนุมัติ',
    text: 'คุณแน่ใจหรือไม่ ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'yes'
  });
}

print() {
  return Swal.fire({
    title: 'Print PDF',
    text: 'คุณแน่ใจหรือไม่ ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'yes'
  });
}

reqWait(text = 'สำเร็จ', title = 'congrate') {
  return Swal.fire({
    type: 'success',
    title: 'เพิ่มผ้าใส่รถเข็น',
    showConfirmButton: false,
    timer: 1500
  });
}

reqRepeat(text = 'ซ้ำ', title = 'congrate') {
  return Swal.fire({
    type: 'warning',
    title: 'มีผ้านี้ในรถเข็นแล้ว',
    showConfirmButton: false,
    timer: 1500
  });
}

reqZero(text = 'กรุณากรอกให้ครบ', title = 'congrate') {
  return Swal.fire({
    type: 'warning',
    title: 'กรุณากรอกให้ครบ',
    showConfirmButton: false,
    timer: 1500
  });
}

reqSuccess(text = 'สำเร็จ', title = 'congrate') {
  return Swal.fire({
    type: 'success',
    title: 'ส่งคำร้องเบิกผ้าเรียบร้อย',
    showConfirmButton: false,
    timer: 1500
  });
}



confirmReq(title = 'คุณต้องการส่งคำร้องเบิกผ้าใช่ไหม ?') {
  return Swal.fire({
    title: 'คุณต้องการส่งคำร้องเบิกผ้าใช่ไหม',
    text: 'คุณแน่ใจหรือไม่ ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'ยกเลิก',
    confirmButtonText: 'ยืนยัน'
  });
}


// loginfail(text = 'username หรือ password ไม่ถูกต้อง', title = 'username หรือ password ไม่ถูกต้อง') {
//   return Swal.fire({
//     title: title,
//     text: text,
//     type: 'error',
//     confirmButtonText: 'ปิด'
//   });
// }
}


