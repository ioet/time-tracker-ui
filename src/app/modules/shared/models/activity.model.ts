export interface Activity {
  id: string;
  name: string;
  description: string;
  tenant_id?: string;
  status?: string;
}

export interface ActivityFront {
  id: string;
  name: string;
  description: string;
  tenant_id?: string;
  status?: string;
  key: string;
  _status: boolean;
  btnColor: string;
  btnIcon: string;
  btnName: string;
}

export interface ActivityStatus {
  id: string;
  status: string;
}
