import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
    SimpleTableComponent,
    SimpleTableColumn,
    SimpleTableData,
} from '@delon/abc'

@Component({
    selector: 'MyInfo',
    templateUrl: './mine.component.html',
    styleUrls: ['./mine.component.less']
})
export class MyInfoComponent implements OnInit {
    salesData: any[] = [];


    form: FormGroup;
    modalVisible = false;
    modalTitle = "";
    selectedRows = [];
    allChecked = false;
    indeterminate = false;
    displayData = [];

    users = [
        {
            id:'001',
            name: '任务1',
            project_name:'项目1',
            condition: '进行中',
            create_time: 7526608842000,
            start_time:1526608842000,
            end_time:1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id:'002',
            name: '任务2',
            project_name:'项目2',
            condition: '进行中',
            create_time: 6526608842000,
            start_time:1526608842000,
            end_time:1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id:'003',
            name: '任务3',
            project_name:'项目3',
            condition: '进行中',
            create_time: 1526608842000,
            start_time:1526608842000,
            end_time:1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id:'004',
            name: '任务4',
            project_name:'项目4',
            condition: '进行中',
            create_time: 1526608842000,
            start_time:1526608842000,
            end_time:1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id:'005',
            name: '任务5',
            project_name:'项目5',
            condition: '未完成',
            create_time: 1526608842000,
            start_time:1526608842000,
            end_time:1526608842000,
            time: 1526608842000,
            checked: false
        }
    ];
    @ViewChild('st') st: SimpleTableComponent;
    columns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '编号',
            index: 'id',

        },
        {
            title: '名称',
            index: 'name',
        },
        { title: '状态', index: 'condition' },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.create_time - b.create_time,
        },
        {
            title: '开始时间',
            index: 'start_time',
            type: 'date',
            sorter: (a: any, b: any) => a.start_time - b.start_time,
        },
        {
            title: '完成时间',
            index: 'end_time',
            type: 'date',
            sorter: (a: any, b: any) => a.end_time - b.end_time,
        }
    ];

    constructor(
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.initForm();
        for (let i = 0; i < 12; i += 1) {
            this.salesData.push({
                x: `${i + 1}月`,
                y: Math.floor(Math.random() * 1000) + 200
            });
        }
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

    checkboxChange(list: any[]) {
        this.selectedRows = list;
      }
   
    selectChange(event: {}){
        this.users.map(user => {
            user.checked = false;
        })
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
    
}
