
export const environment = {
  production: false,
  USERS_API: process.env.USERS_API ?? "http://localhost:3001",
  POSTS_API: process.env.POSTS_API ?? "http://localhost:3002",
};