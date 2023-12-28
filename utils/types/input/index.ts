import { ChangeEvent } from 'react';

export type InputType = ChangeEvent<HTMLInputElement>;

export type TextAreaType = ChangeEvent<HTMLTextAreaElement>;

export type Option = { label: string; onClick: (item?: any) => void };
