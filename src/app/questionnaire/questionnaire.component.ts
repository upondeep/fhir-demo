import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import questionnaireJson from '../../assets/questionnaire.json';

interface QuestionNode {
  linkId: string;
  text: string;
  type: 'boolean' | 'string' | 'decimal' | 'dateTime' | 'integer' | 'date' | 'time' | 'group';
  answer?: string;
  item?: QuestionNode[];
}
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder
  ) {
    this.json = Object.assign({}, questionnaireJson);
    this.dataSource.data = this.json['item'] as QuestionNode[];
    this.treeControl.dataNodes = this.json['item'];
  }

  ngOnInit(): void {
    console.log("Question: ", questionnaireJson);
  }

  ngAfterViewInit() {
    this.tree.treeControl.expandAll();
  }
}
