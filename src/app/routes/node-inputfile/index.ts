import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { RawData } from '@domain';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Component({
    selector: 'node-inputfile',
    templateUrl: './node-inputfile.component.html',
    styleUrls: ['./node-inputfile.component.less']
})
export class NodeInputfileComponent implements OnInit {

    @Input() projectId: any;
    @Input() toolId: number;
    rawdatas$: Observable<RawData[]>;
    rawdatas: RawData[];

    constructor(private modal: NzModalRef, private msg: NzMessageService, private http: _HttpClient, ) { }

    searchColumn: STColumn[] = [
        { title: '序号', index: 'id', className: 'text-center' },
        { title: '文件名', index: 'name', click: (item: any) => this.msg.success(item.name), className: 'text-center' },
        { type: 'date', title: '上传时间', index: 'createdAt', sorter: (a, b) => a.count - b.count, className: 'text-center' },
        {
            title: '操作', buttons: [
                {
                    text: '删除',
                    click: (item: RawData) => {
                        this.msg.success('删除处理')
                    },
                },
            ], className: 'text-center'
        },
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

    handleChange({ file, fileList }): void {
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.http.post('/rawdata', { id: this.rawdatas.length, name: file.name, url: '/home/huang/file', }).subscribe(() => {
                this.getData();
            });
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }

    destroyModal(): void {
        this.modal.destroy({ data: 'this the result data' });
    }
}
