import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { useStrapi } from "strapi-react-context";
import marked from "marked";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TosDialog = ({ open, toggle }) => {
  const strapi = useStrapi();
  const { t } = useTranslation();
  const page = strapi.stores?.pages?.find(({ type }) => type === "tos");

  useEffect(() => {
    strapi.services.pages.find({ type: "tos" });
  }, [strapi.services.pages]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={toggle}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{page?.name}</DialogTitle>
      <DialogContent>
        {page && (
          <DialogContentText
            dangerouslySetInnerHTML={{ __html: marked(page.content) }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>{t("generic.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TosDialog;
