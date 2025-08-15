export interface AuthUser {
  _id: string;
  username: string;
  role_id: string;
  school_id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
