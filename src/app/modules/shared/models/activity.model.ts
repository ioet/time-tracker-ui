export interface Activity {
  id: string;
  name: string;
  description: string;
  tenant_id?: string;
  status?: string;
}

export interface Status {
  id: string;
  status: string;
}
