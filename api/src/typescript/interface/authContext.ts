export default interface AuthContext {
  user: {
    id: string;
    username: string;
    verified: Boolean;
  };
}
