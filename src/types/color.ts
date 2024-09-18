export enum ColorType {
  select = 'select',
  custom = 'custom',
}

export interface Color {
  type: ColorType
  value: string
}
