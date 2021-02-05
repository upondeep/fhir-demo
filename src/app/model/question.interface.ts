import { QuestionnaireComponent } from "../questionnaire/questionnaire.component";

export interface QuestionNode {
    linkId: string;
    text: string;
    type: 'boolean' | 'string' | 'decimal' | 'dateTime' | 'integer' | 'date' | 'time' | 'group';
    answer?: string;
    item?: QuestionNode[];
    data?: QuestionNode;
}