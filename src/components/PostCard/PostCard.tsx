import "./PostCard.css";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import PostDTO from "../../models/PostDTO";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import PostsAPI from "../../api/PostsAPI";
import User from "../../models/User";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

const PostCard = ({
  id,
  photoSrc,
  createdAt,
  avatarSrc,
  userName,
  likesNum,
  isLikedByCurrentUser,
}: PostDTO) => {
  const loggedInUserContext = useContext(LoggedInUserContext);
  const currentLoggedInUser: User = loggedInUserContext.user!;

  const [isLiked, setLiked] = useState<boolean>(isLikedByCurrentUser);
  const [likesN, setLikesN] = useState(likesNum);

  const isFirstRun = useRef(true);

  const clickCounter = useRef<number>(0);
  const firstClickTime = useRef<number>(0);
  const heartIconEffectRef = useRef<SVGSVGElement>(null);

  const currentPageContext = useContext(CurrentPageContext);
  const setCurrentPage = currentPageContext.setPage;

  const goToProfile = () => {
    setCurrentPage("profile", userName);
  };

  const onLikeButton = () => {
    setLiked(!isLiked);
  };

  useEffect(() => {
    const likePost = async () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      if (isLiked) {
        PostsAPI.getInstance().likePost(id, currentLoggedInUser.name);
        setLikesN(likesN + 1);
      } else {
        PostsAPI.getInstance().unLikePost(id, currentLoggedInUser.name);
        setLikesN(likesN - 1);
      }
    };

    likePost();
  }, [isLiked]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const detectDoubleClick = async () => {
    if (new Date().getTime() - firstClickTime.current > 500) {
      clickCounter.current = 0;
    }

    clickCounter.current += 1;

    if (clickCounter.current === 1) {
      firstClickTime.current = new Date().getTime();
    }

    if (clickCounter.current == 2 && heartIconEffectRef.current) {
      heartIconEffectRef.current.classList.add("like-heart-effect");
      setLiked(true);
      await delay(1001);
      heartIconEffectRef.current.classList.remove("like-heart-effect");
      clickCounter.current = 0;
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 0,
        borderTop: 0,
        borderRight: 0,
        borderLeft: 0,
        borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
        position: "relative",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={<Avatar src={avatarSrc}></Avatar>}
        title={userName}
        onClick={goToProfile}
      />
      <FavoriteIcon
        ref={heartIconEffectRef}
        className="heart-icon-design"
      ></FavoriteIcon>
      <CardMedia
        component="img"
        height="194"
        image={photoSrc}
        onClick={detectDoubleClick}
      />
      <CardActions disableSpacing>
        <IconButton
          className={isLiked ? "like-button" : ""}
          sx={{ color: isLiked ? "#e57373" : undefined }}
          onClick={onLikeButton}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography sx={{ color: isLiked ? "#e57373" : undefined }}>
          {likesN}
        </Typography>

        <Typography sx={{ ml: "auto" }}>
          {moment(createdAt).fromNow()}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
