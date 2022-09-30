export interface ITodo {
  id?: number | null;
  userId?: number;
  title: string;
  status: EnumTodoStatus;
}

export interface ICreateTodoDto extends Omit<ITodo, 'userId'> {
  title: string;
  status: EnumTodoStatus;
}

export interface IUpdateTodoDto {
  id: number;
  title?: string;
  status?: EnumTodoStatus;
}

export enum EnumTodoStatus {
  done = 'done',
  unfinished = 'unfinished',
  deleted = 'deleted'
}

export enum EnumRoles {
  user = 'user',
  admin = 'admin'
}
