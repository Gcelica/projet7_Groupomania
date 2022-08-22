import AddCommentIcon from "@mui/icons-material/AddComment";

import { Link } from "react-router-dom";

function ButtonNewPost() {
  return (
    <nav>
      <Link className="topbarLink" to="/feed/newPost">
        <AddCommentIcon />
      </Link>
    </nav>
  );
}
export default ButtonNewPost;
