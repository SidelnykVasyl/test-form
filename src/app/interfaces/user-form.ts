import { Beneficiaries } from './beneficiaries';

export interface UserForm {
  contactInfo: ContactInfo;
  personalInfo: PersonalInfo;
  beneficiaries: Beneficiaries[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}
