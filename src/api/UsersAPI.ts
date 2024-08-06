import HttpClient from "./HttpClient";
import User from "../models/User";
import PostDTO from "../models/PostDTO";

export default class UsersAPI extends HttpClient {
  private static classInstance?: UsersAPI;

  private constructor() {
    super("users/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UsersAPI();
    }

    return this.classInstance;
  }

  public getAllUsers = async () => await this.instance.get<User[]>("/");

  public getUser = async (name: string) => {
    return await this.instance.get<User>(`${name}`, {
      signal: this.controller?.signal,
    });
  };

  public getUserPosts = async (name: string) =>
    await this.instance.get<PostDTO[]>(`${name}/posts`);

  public getLoggedInUser = async () => {
    const user = await this.instance.get<User>(`currentLoggedIn`);
    return user;
  };

  public deleteUser = async (name: string) =>
    await this.instance.delete<User>(`${name}`);
}
