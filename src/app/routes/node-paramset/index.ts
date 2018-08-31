import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'node-paramset',
    templateUrl: './node-paramset.component.html',
    styleUrls: ['./node-paramset.component.less']
})
export class NodeParamsetComponent implements OnInit {

    @Input() projectId: number;
    @Input() toolId: number;
    form: FormGroup;
    submitting = false;

    constructor(private fb: FormBuilder, private msg: NzMessageService) { }

    ngOnInit() {
        this.form = this.fb.group({
            param1: [null, [Validators.required]],
            param2: [null, [Validators.required]],
            param3: [null, [Validators.required]],
            param4: [null, [Validators.required]],
            param5: [null, [Validators.required]],
            param6: [null, [Validators.required]],
            param7: [null, [Validators.required]],
        });
    }

    submit() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) return;
        this.submitting = true;
        setTimeout(() => {
            this.submitting = false;
            this.msg.success(`提交成功`);
        }, 1000);
    }

}
