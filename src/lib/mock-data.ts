export type User = {
  id: string;
  email: string;
  isLoggedIn: boolean;
  role: "USER" | "ADMIN";
  subscriber: boolean;
  fullName: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "suspended";
  city: string;
  createdAt: Date;
};

export type UserActivity = {
  id: string;
  userId: string;
  type: "post" | "comment" | "like";
  content: string;
  createdAt: Date;
};

export type Subscription = {
  id: string;
  userId: string;
  plan: "basic" | "pro" | "enterprise";
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  endDate: Date;
  amount: number;
};

// Generate mock users
export const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i + 1}`,
  email: i === 0 ? "somanathbarik143@gmail.com" : `user${i + 1}@example.com`,
  isLoggedIn: Math.random() > 0.5,
  role: Math.random() > 0.8 ? "ADMIN" : "USER",
  subscriber: Math.random() > 0.5,
  fullName: i === 0 ? "Somanath Barik" : `User ${i + 1}`,
  phone:
    i === 0
      ? "7683044093"
      : `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
  address:
    i === 0 ? "Bengaluru" : `${Math.floor(Math.random() * 999) + 1} Main St`,
  status:
    Math.random() > 0.8
      ? "suspended"
      : Math.random() > 0.5
        ? "active"
        : "inactive",
  city:
    i === 0
      ? "Bengaluru"
      : ["New York", "London", "Tokyo", "Paris", "Berlin"][
          Math.floor(Math.random() * 5)
        ],
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000),
  ),
}));

// Generate mock activities
export const mockActivities: UserActivity[] = mockUsers.flatMap((user) =>
  Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
    id: `activity-${user.id}-${i}`,
    userId: user.id,
    type: ["post", "comment", "like"][
      Math.floor(Math.random() * 3)
    ] as UserActivity["type"],
    content: `Sample ${["post", "comment", "like"][Math.floor(Math.random() * 3)]} content`,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
    ),
  })),
);

// Generate mock subscriptions
export const mockSubscriptions: Subscription[] = mockUsers
  .filter((user) => user.subscriber)
  .map((user) => ({
    id: `sub-${user.id}`,
    userId: user.id,
    plan: ["basic", "pro", "enterprise"][
      Math.floor(Math.random() * 3)
    ] as Subscription["plan"],
    status: ["active", "cancelled", "expired"][
      Math.floor(Math.random() * 3)
    ] as Subscription["status"],
    startDate: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
    ),
    endDate: new Date(
      Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
    ),
    amount: [9.99, 19.99, 49.99][Math.floor(Math.random() * 3)],
  }));
