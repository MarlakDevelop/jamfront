export interface UserAction{
  icon: string;
  action: (...kwargs) => any;
  actionArgs: any[];
}
