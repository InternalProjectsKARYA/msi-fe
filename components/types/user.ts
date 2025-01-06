import { ReactNode } from 'react';

export enum UserRole {
  Admin = 'role_1',
  Manager = 'role_2',
  Teacher = 'role_3',
  Student = 'role_4',
  Parent = 'role_5',
  Librarian = 'role_8',
  Accountant = 'role_7',
}

export interface User {
  user_name: string;
  email_id: string;
  role: UserRole;
}

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  hasSubmenu?: boolean;
  subItems?: NavItem[];
}

export interface NavSection {
  sectionLabel: string;
  items: NavItem[];
}

