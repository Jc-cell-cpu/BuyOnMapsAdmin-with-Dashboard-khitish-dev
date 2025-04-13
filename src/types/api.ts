export interface User {
  id?: string;
  email?: string;
  role?: string;
  status?: string;
  subscriber?: number;
  fullName?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
}

export interface ApiResponse {
  response: {
    status: boolean;
    responseCode: number;
    message: string;
  };
  data: {
    users?: User[];
    meta: PaginationMeta;
  };
}

export interface UserDetails {
  status: string;
  email: string;
  role: string;
  subscriber: number;
  fullName: string;
  profilePicture: string;
  phone: string;
  id: string;
}
