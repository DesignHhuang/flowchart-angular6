import { Component, OnInit, } from '@angular/core';
import $ from 'jquery';
import * as d3 from 'd3'
declare const jsPlumb: any;
import { DndDropEvent } from 'ngx-drag-drop';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Tools } from '@domain';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NodeInputfileComponent } from '../../routes/manage/node-inputfile';
import { NodeParamsetComponent } from '../../routes/manage/node-paramset';

@Component({
    selector: 'WorkflowManage',
    templateUrl: './default.component.html',
})
export class LayoutDefaultComponent implements OnInit {

    tplModal: NzModalRef;
    code = 0;
    active = 0;
    tools$: Observable<Tools[]>;
    tool$: Observable<Tools>;
    offx = 0;
    offy = 0;
    lastDropEvent: DndDropEvent[] = [];
    currentNodeData;
    instance;

    constructor(private http: _HttpClient, private msg: NzMessageService, private modalService: NzModalService) { }

    getTools = (type: number) => {
        this.tools$ = this.http.post('/tool', { type: type });
        this.active = type;
    }

    ngOnInit() {
        this.getTools(this.active);
        let that = this;
    }

    addNode(instance, nodeId, data, position) {

        return jsPlumb.getSelector('#' + nodeId)[0];
    }


    addPorts(instance, node, ports) {
    }

    onDragStart(event: DragEvent) {
        this.offx = event.offsetX;
        this.offy = event.offsetY;
        console.log(event);
    }

    onDragEnd(event: DragEvent) {
    }

    onDraggableCopied(event: DragEvent) {
    }

    onDraggableLinked(event: DragEvent) {
    }

    onDraggableMoved(event: DragEvent) {
    }

    onDragCanceled(event: DragEvent) {
    }

    onDragover(event: DragEvent) {
    }

    onDrop(event: any) {
        this.lastDropEvent.push(event);
        this.currentNodeData = event.data;
    }

    baocun() {
    }

    jiazai() {
    }
}

