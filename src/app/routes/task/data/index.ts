import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
} from '@delon/abc'

@Component({
  selector: 'DataTask',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less']
})
export class DataTaskComponent implements OnInit {

  form: FormGroup;
  modalVisible = false;
  modalTitle = "";
  selectedRows = [];
  loading=false;
  allChecked = false;
  indeterminate = false;
  displayData = [];

  users = [];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    {
      title: '分析编号',
      index: 'id',

    },
    {
      title: '分析名称',
      index: 'name',
    },
    {
      title: '检测项目',
      index: 'pro_name',
    },
    { title: '分析状态', index: 'condition' },
    {
      title: '创建时间',
      index: 'create_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '开始时间',
      index: 'start_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '完成时间',
      index: 'end_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '接受时间',
      index: 'end_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    }
  ];

  columns1: SimpleTableColumn[] = [
    {
      title: '检测项目编号',
      index: 'pro_name',
    },
    { title: '检测项目', index: 'condition' },
    {
      title: '立项时间',
      index: 'create_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '更新时间',
      index: 'start_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '项目进度',
      index: 'end_time',
      type: 'date',
      sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    },
    {
      title: '操作',
      buttons: [
        {
          text: '申领',
          click: (item: any) => {
            this.openModal()
          },
        },
      ],
    },
  ];
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getData()
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      age: ['', [Validators.required]],

    });
  }

  openModal() {
    this.modalVisible = true;
    this.modalTitle = "新增"
  }

  getData() {
    this.loading = true;
    this.http.get('/task').subscribe((res: any) => {
      // this.list = this.list.concat(res);
      console.log(res)
      this.users = res.data.map(r => ({...r, checked:false}));
      this.loading = false;
    });
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
}

refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
}


  checkboxChange(list: any[]) {
    this.selectedRows = list;
  }

  checkAll(event:boolean){
    this.users.map(user => {
        user.checked = event;
    })  
  }

  selectChange(event:{}){
    this.checkAll(false);
    this.allChecked = false;
}

}
