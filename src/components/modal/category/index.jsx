/* eslint-disable react/prop-types */
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { serviceValidationSchema } from "../../../utils/validation";
import category from "../../../service/category";

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const Index = ({ open, handleClose, item }) => {
  console.log(item, "item");

  const initialValues = {
    category_name: item?.category_name || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        const payload = { id: item.id, ...values };
        response = await category.update(payload);
      } else {
        response = await category.create(values);
      }

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
        handleClose();
      } else {
        console.error("Failed to save service:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Create category
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={serviceValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="category_name"
                  type="text"
                  as={TextField}
                  label="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="name" />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px" }}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
