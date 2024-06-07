import Link from "@mui/material/Link";
import { IntermediateRepresentation } from "linkifyjs";

const DetailsLink = ({attributes, content}: IntermediateRepresentation) => {
  return (
    <Link {...attributes} target="_blank">
      {content}
    </Link>
  );
};

export default DetailsLink;
