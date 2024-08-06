import Post from "./Post";

export default class User {
  name: string;
  avatarSrc: string;
  posts: Post[];

  constructor(name: string, avatarSrc: string, posts: Post[]) {
    this.name = name;
    this.avatarSrc = avatarSrc;
    this.posts = posts;
  }
}
