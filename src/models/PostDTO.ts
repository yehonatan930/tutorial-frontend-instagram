export default class PostDTO {
  id: number;
  photoSrc: string;
  createdAt: Date;
  avatarSrc: string;
  userName: string;
  likesNum: number;
  isLikedByCurrentUser: boolean;

  constructor(
    id: number,
    photoSrc: string,
    createdAt: Date,
    avatarSrc: string,
    userName: string,
    likesNum: number,
    isLikedByCurrentUser: boolean
  ) {
    this.id = id;
    this.photoSrc = photoSrc;
    this.createdAt = createdAt;
    this.avatarSrc = avatarSrc;
    this.createdAt = createdAt;
    this.userName = userName;
    this.likesNum = likesNum;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
  }
}
