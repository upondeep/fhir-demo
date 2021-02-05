import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { QuestionNode } from '../model/question.interface';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input() response: {};
  @ViewChild('tree') tree: MatTree<QuestionNode>;
  json;
  quesForm: FormGroup;
  dataSource = new MatTreeNestedDataSource<QuestionNode>();
  treeControl = new NestedTreeControl<QuestionNode>(node => node.item);
  hasChild = (_: number, node: QuestionNode) => !!node.item && node.item.length > 0;

  isTopLevel(node: QuestionNode): boolean {
    console.log("node: ", node);
    return !/\./.test(node.linkId);
  }

  constructor() {
    // this.json = Object.assign({}, this.response);
    // this.dataSource.data = this.json['item'] as QuestionNode[];
    // this.treeControl.dataNodes = this.json['item'];
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    const response = changes.response;
    console.log("response changed:", response);
    if (response.currentValue) {
      this.json = Object.assign({}, this.response);
      this.dataSource.data = this.json['item'] as QuestionNode[];
      this.treeControl.dataNodes = this.json['item'];
      this.tree.treeControl.expandAll();
    }
  }

  ngAfterViewInit() {

  }
}
