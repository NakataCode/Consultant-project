export interface RootState {
  messages: {
    value: Array<{
      message: string;
      email: string;
    }>;
  };
  search: {
    query: string;
  };
}

export interface Message {
  id?: string;
  message: string;
  email: string | null;
  sender: string | null;
  receiver: string | null;
  adId: string;
  createdAt: string;
}
