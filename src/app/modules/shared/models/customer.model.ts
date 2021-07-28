export interface Customer {
  id?: string;
  name?: string;
  description?: string;
  status?: any;
}
export interface CustomerUI {
  id?: string;
  name: string;
  description: string;
  tenant_id?: string;
  status?: string;
  key: string;
  _status: boolean;
  btnColor?: string;
  btnIcon: string;
  btnIconTwo: string;
  btnName: string;
  iconColor: string;
}
export interface Status {
  id: string;
  status: any;
}
