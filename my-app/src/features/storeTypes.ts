import { AdvertisementData } from "./AdvertFormInputs";

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
  advertisements: {
    advertisements: AdvertisementData[];
  };
  auth: {
    isSignedIn: boolean;
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
