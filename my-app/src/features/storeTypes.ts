import { AdvertisementData } from "./AdvertFormInputs";

export interface RootState {
  messages: {
    value: Array<{
      email: string;
      message: string;
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
  adId: string;
  adTitle: string;
  createdAt: string;
  email: string | null;
  id?: string;
  message: string;
  receiver: string | null;
  sender: string | null;
}
