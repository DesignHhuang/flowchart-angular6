import { Component, OnInit, } from '@angular/core';
import $ from 'jquery';
import * as d3 from 'd3';
declare const jsPlumb: any;
import { DndDropEvent } from 'ngx-drag-drop';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Tools } from '@domain';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NodeInputfileComponent } from '../node-inputfile';
import { NodeParamsetComponent } from '../node-paramset';
import { NodeSelectfileComponent } from '../node-selectfile';

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

    constructor(private http: _HttpClient, private msg: NzMessageService, private modalService: NzModalService) {

    }

    getTools = (type: number) => {
        this.tools$ = this.http.post('/tool', { type: type });
        this.active = type;
    }

    ngOnInit() {
        this.getTools(this.active);
        let that = this;
        jsPlumb.ready(function () {
            let color = "#5b5a57";
            that.instance = jsPlumb.getInstance({
                Connector: ["Bezier", { curviness: 50 }],
                DragOptions: { cursor: "pointer", zIndex: 2000 },
                PaintStyle: {
                    strokeStyle: color, lineWidth: 3
                },
                Overlays: [["PlainArrow", { location: 1, width: 12, length: 12 }]],
                Endpoint: ["Dot", { radius: 5 }],
                EndpointStyle: { fillStyle: "#567567" },
                HoverPaintStyle: { strokeStyle: "#7073EB" },
                EndpointHoverStyle: { fillStyle: "#7073EB" },
                Container: "flow-panel",
                ConnectionOverlays: [["Custom", {
                    create: function (component) {
                        return $("<button title='选择输入文件'><i class='anticon anticon-select'></i></button>");
                    },
                    location: 0.5,
                    events: {
                        click: function (Overlay, originalEvent) {
                            that.selectInputfileModal(Overlay.component.sourceId, Overlay.component.sourceId.split('-')[1]);
                        }
                    }
                }]]
            });
            that.instance.bind("connection", function (connInfo, originalEvent) {
                that.http.post('/tool/check', { sourcenode: connInfo.connection.sourceId.split('-')[1], targetnode: connInfo.connection.targetId.split('-')[1] }).subscribe(res => {
                    if (!res) {
                        that.msg.error('输出的文件格式与目标工具的输入格式不搭配，请重新选择！', { nzDuration: 3000 });
                        jsPlumb.detach(connInfo.connection);
                    }
                });
            });
            $('#flow-panel').on('drop', function (ev) {
                if (ev.target.className.indexOf('_jsPlumb') >= 0) {
                    return;
                }
                ev.preventDefault();
                let mx = '' + (ev.originalEvent.offsetX - that.offx) + 'px';
                let my = '' + (ev.originalEvent.offsetY - that.offy) + 'px';
                let node = that.addNode(that.instance, that.code + "-" + that.currentNodeData.id, that.currentNodeData, { x: mx, y: my });
                that.addPorts(that.instance, node, ["Top", "Bottom", "Left", "Right"]);
                that.instance.draggable($(node), {
                    containment: 'parent'
                });
                that.code++;
            }).on('dragover', function (ev) {
                ev.preventDefault();
                console.log('on drag over');
            });
            jsPlumb.fire("jsFlowLoaded", that.instance);
            that.instance.bind('dblclick', function (conn) {
                jsPlumb.detach(conn)
            })
        })
    }

    addNode(instance, nodeId, data, position) {
        let panel = d3.select("#flow-panel");
        let that = this;
        panel.append('div')
            .style('position', 'absolute')
            .style('top', position.y).style('left', position.x)
            .style('width', ' 200px').style('background-color', 'white')
            .style('border-radius', '8px')
            .attr('id', nodeId).classed('node', true);
        $('#' + nodeId).hover(function () {
            $(this).removeClass("outhover").addClass("inhover");
        }, function () {
            $(this).removeClass("inhover").addClass("outhover");
        })

        /* <div id='" + nodeId + "-selectfile' title='详情'><i class='anticon anticon-profile'></i></div> */

        $('#' + nodeId).append("<div class='huangcard'><div class='zuo'><div class='title'><strong>" + data.name + "</strong></div><div class='card-content'><i class='anticon anticon-user'></i><span class='mes'>" + data.id + "黄小民</span></div><div class='card-content'><i class='anticon anticon-message'></i><span class='mes'>低质量数据过滤</span></div><div class='card-content'><i class='anticon anticon-clock-circle-o'></i><span class='mes'>执行时间：20min20s</span></div></div><div class='you'><div id='" + nodeId + "-setting' title='参数设置'><i class='anticon anticon-setting'></i></div><div id='" + nodeId + "-inputFile' title='上传文件'><i class='anticon anticon-file-add'></i></div><div id='" + nodeId + "-delete' title='删除'><i class='anticon anticon-delete'></i></div></div></div>")
        data.inputFile ? $('#' + nodeId + '-setting').hide() : $('#' + nodeId + '-inputFile').hide();
        $('#' + nodeId + '-delete').click(function () {
            instance.detachAllConnections(nodeId);
            instance.deleteEndpoint(nodeId + "-Top");
            instance.deleteEndpoint(nodeId + "-Bottom");
            instance.deleteEndpoint(nodeId + "-Left");
            instance.deleteEndpoint(nodeId + "-Right");
            instance.remove(nodeId);
        })
        $('#' + nodeId + '-inputFile').click(function () {
            that.createInputfileModal(nodeId.split('-')[1]);
        })
        $('#' + nodeId + '-setting').click(function () {
            that.createSettingModal(nodeId.split('-')[1]);
        })
        return jsPlumb.getSelector('#' + nodeId)[0];
    }

    selectInputfileModal(nodeId, toolId) {
        this.modalService.create({
            nzTitle: '输入文件选择',
            nzContent: NodeSelectfileComponent,
            nzComponentParams: {
                projectId: 'jiance1',
                nodeId: nodeId,
                toolId: toolId
            },
            nzMaskClosable: false,
            nzFooter: null,
        });
    }

    createInputfileModal(toolId): void {
        this.modalService.create({
            nzTitle: '原始数据上传',
            nzContent: NodeInputfileComponent,
            nzComponentParams: {
                projectId: 'jiance1',
                toolId: toolId
            },
            nzMaskClosable: false,
            nzFooter: null,
        });
    }

    createSettingModal(toolId): void {
        this.modalService.create({
            nzTitle: '参数设置',
            nzContent: NodeParamsetComponent,
            nzComponentParams: {
                projectId: 'ceshicanshu1',
                toolId: toolId
            },
            nzMaskClosable: false,
            nzFooter: null,
        });
    }

    addPorts(instance, node, ports) {
        for (let i = 0; i < ports.length; i++) {
            let paintStyle = { radius: 5, fillStyle: '#D4FFD6' };
            instance.addEndpoint(node, {
                uuid: node.getAttribute("id") + "-" + ports[i],
                paintStyle: paintStyle,
                anchor: ports[i],
                maxConnections: -1,
                isSource: true,
                isTarget: true
            });
        }
    }

    onDragStart(event: DragEvent) {
        this.offx = event.offsetX;
        this.offy = event.offsetY;
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
        let connects = [];
        let nodes = [];
        $.each(this.instance.getConnections(), function (idx, connection) {
            connects.push({
                ConId: connection.id,
                SourceId: connection.endpoints.map(res => res._jsPlumb.uuid)[0],
                TargetId: connection.endpoints.map(res => res._jsPlumb.uuid)[1],
            });
        });
        $("#flow-panel .node").each(function (idx, elem) {
            var $elem = $(elem);
            nodes.push({
                NodeId: $elem.attr('id'),
                PositionX: parseInt($elem.css("left"), 10),
                PositionY: parseInt($elem.css("top"), 10)
            });
        });
        let flowChart = { nodes: nodes, connects: connects };
        var flowChartJson = JSON.stringify(flowChart);
        $('#jsonOutput').val(flowChartJson);
    }

    jiazai() {
        let that = this;
        $("#flow-panel .node").each(function (idx, elem) {
            that.instance.remove($(elem).attr('id'))
        });
        if ($('#jsonInput').val() != '') {
            let flowChartJson = JSON.parse($('#jsonInput').val());
            flowChartJson.nodes.forEach((element, index) => {
                this.http.get('/tool/' + element.NodeId.split('-')[1]).subscribe(data => {
                    let node = this.addNode(this.instance, element.NodeId, data, { x: element.PositionX + 'px', y: element.PositionY + 'px' });
                    this.addPorts(this.instance, node, ["Top", "Bottom", "Left", "Right"]);
                    this.instance.draggable($(node), {
                        containment: 'parent'
                    });
                    if (index == flowChartJson.nodes.length - 1) {
                        flowChartJson.connects.forEach(element => {
                            this.instance.connect({ uuids: [element.SourceId, element.TargetId] });
                        });
                    }
                })
            })
        }
    }
}

