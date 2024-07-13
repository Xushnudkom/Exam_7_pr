import { Backdrop, Box, Button, Fade, Modal, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import http from "../../../service/config";
import { toast } from "react-toastify";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",    
    width: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    px: 4,
    p: 3,
    borderRadius: 2,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Index = ({data}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImg = (e) => {
        const media = new FormData()
        media.append('file', e.target.files[0])
        http.post(`media/upload-photo?id=${data}`, media)
        toast.success('Success media')
        handleClose()
    }

    console.log(data);
    return (
        <div className="relative">
        <button
        className="absolute z-10 bottom-[-10px]  p-1 md:p-2 rounded-full right-11 md:right-14"
        onClick={handleOpen}
        >
        <AddPhotoAlternateIcon />
        </button>

            <Modal
                aria-labelledby={`child-modal-title${data}`}
                aria-describedby={`transition-modal-description${data}`}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload file
                        <VisuallyHiddenInput onChange={handleImg} type="file" />
                    </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Index;