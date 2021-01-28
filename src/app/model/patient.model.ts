import { GENDER } from "../enum/gender.enum";
import { MARITIAL } from "../enum/maritial-status.enum";

export interface Patient {
    id?: string;
    name: string;
    address?: string;
    birthDate: string;
    gender: GENDER | string;
    maritalStatus?: MARITIAL | string;
}