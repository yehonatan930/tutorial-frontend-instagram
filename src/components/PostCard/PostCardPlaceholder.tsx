import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";

const PostCardPlaceholder = () => (
  <>
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
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={<Skeleton animation="wave" height={10} width="80%" />}
      />
      <Skeleton sx={{ height: 194 }} animation="wave" variant="rectangular" />

      <CardActions disableSpacing sx={{ p: "24px" }}>
        <Skeleton
          animation="wave"
          height={10}
          width="20%"
          sx={{ ml: "auto" }}
        />
      </CardActions>
    </Card>
  </>
);

export default PostCardPlaceholder;
