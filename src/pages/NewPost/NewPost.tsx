import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useContext, useState } from "react";
import "./NewPost.css";
import PostsAPI from "../../api/PostsAPI";
import Post from "../../models/Post";
import User from "../../models/User";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

const NewPost = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loggedInUserContext = useContext(LoggedInUserContext);
  const user: User = loggedInUserContext.user!;

  const currentPageContext = useContext(CurrentPageContext);
  const setCurrentPage = currentPageContext.setPage;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value);
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const createPost = async () => {
    setLoading(true);

    await PostsAPI.getInstance().savePost(
      new Post(imageURL, new Date(), user, [])
    );

    await delay(2000);

    setLoading(false);

    setCurrentPage("profile");
  };

  return (
    <Box
      component="form"
      sx={{
        m: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ mb: 3 }} fullWidth variant="standard">
        <InputLabel htmlFor="imageURLInput">Photo url</InputLabel>
        <Input
          fullWidth
          id="imageURLInput"
          value={imageURL}
          onChange={handleChange}
          aria-describedby="imageURLInput-text"
        />
        <FormHelperText id="imageURLInput-text">
          create a new post with the specified URL
        </FormHelperText>
      </FormControl>
      <img
        className="image-preview"
        src={`${imageURL}`}
        srcSet={`${imageURL}`}
        loading="lazy"
        alt="preview"
      />
      <LoadingButton
        fullWidth
        loading={loading}
        variant="contained"
        disableElevation
        disabled={imageURL === ""}
        onClick={createPost}
      >
        Create
      </LoadingButton>
    </Box>
  );
};

export default NewPost;
