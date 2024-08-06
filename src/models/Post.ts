import User from "./User";

export default class Post {
  id: number | undefined;
  photoSrc: string;
  createdAt: Date;
  user: User;
  likes: User[];

  constructor(photoSrc: string, createdAt: Date, user: User, likes: User[]) {
    this.photoSrc = photoSrc;
    this.createdAt = createdAt;
    this.user = user;
    this.likes = likes;
  }
}
