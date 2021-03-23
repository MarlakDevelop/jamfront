export interface ChatDetailModel {
  id: number;
  name: string;
  image: string;
  is_owner: boolean;
}

export interface ChatShortModel {
  id: number;
  name: string;
  image: string;
  last_message_date: Date;
}

export interface ChatUploadModel {
  name: string;
  image: string;
}

export interface MessageModel {
  id: number;
  username: string;
  image: string;
  text: string;
  date: Date;
}
