import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { SimpleTableColumn } from '@delon/abc';
import { RawData } from '@domain';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Component({
    selector: 'node-selectfile',
    templateUrl: './node-selectfile.component.html',
    styleUrls: ['./node-selectfile.component.less']
})
export class NodeSelectfileComponent implements OnInit {

    @Input() projectId: number;
    @Input() toolId: number;
    rawdatas$: Observable<RawData[]>;
    rawdatas: RawData[];
    filelist;

    constructor(private modal: NzModalRef, private msg: NzMessageService, private http: _HttpClient, ) { }

    selectColumn: SimpleTableColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox', className: 'text-center' },
        { title: '序号', index: 'id', className: 'text-center' },
        { title: '文件名', index: 'name', click: (item: any) => this.msg.success(item.name), className: 'text-center' },
        { type: 'date', title: '上传时间', index: 'createdAt', sorter: (a, b) => a.count - b.count, className: 'text-center' },
    ];

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.rawdatas$ = this.http.get('/rawdata');
        this.rawdatas$.subscribe(res => {
            this.rawdatas = res;
        });
    }

    checkboxChange(list: any[]) {
        console.log('checkboxChange', list);
        this.filelist = list;
    }

    queren() {
        console.log(this.filelist)
    }

}
