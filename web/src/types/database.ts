export type Database = {
  uuid: string;
  volume_uuid: string;
  name: string;
  type: string;
  image_name: string;
  image_version: string;
  environment?: string;
  domain?: string;
  port?: number;
  status: string;
  created_at: string;
  updated_at: string;
};
