export interface Category {
  _id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  response: {
    status: boolean;
    responseCode: number;
    message: string;
  };
  data: Category[];
}
