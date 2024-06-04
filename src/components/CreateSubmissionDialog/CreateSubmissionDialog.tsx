'use client';
import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  Box,
  InputBase,
  CircularProgress
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Alert from '../Alert/Alert'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useParams } from 'next/navigation';

interface Props {
  onSubmit: () => void;
}

export default function CreateSubmissionDialog(props: Props) {
  const { onSubmit } = props;
  const params = useParams<{ homeworkID: string; }>()

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [submitSuccess, setSubmitSuccees] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData(event.currentTarget)
    
    const pythonFile = formData.get('file') as File;

    const storage = getStorage();

    const fileRef = ref(storage, `python_codes/${pythonFile.name}`)

    const snapshot = await uploadBytes(fileRef, pythonFile);

    const fileUrl = await getDownloadURL(fileRef);

    const newSubmission = {
      "author": formData.get('author'),
      "homework_id": params.homeworkID,
      "file_name": pythonFile.name,
      "file_url": fileUrl,
    };

    const request = await fetch("http://localhost:5000/api/submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSubmission)
    });

    setIsLoading(false);
    setSubmit(true);

    if(!request.ok) {
      // Show Message error
      setSubmitSuccees(false);
      return;
    }

    setSubmitSuccees(true);

    handleClose();
    onSubmit();
  };

  return (
    <React.Fragment>
      <Button
        variant='text'
        startIcon={<Add />}
        onClick={handleClickOpen}
      >
        Subir archivo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Crear Entrega</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant='subtitle2'>Código base</Typography>
            <DialogContentText>
              Sube tu archivo .py aquí. El código será analizado contra todas las entregas para generar un índice de similitud.
            </DialogContentText>
            <InputBase required type="file" inputProps={{ accept: ".py" } } name='file'/>
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            name='author'
            label="Autor"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
           Subir Entrega
           {
              isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {
        submit && (
          <Alert
            onTimeout={() => setSubmit(false)}
            severity={
              submitSuccess ? "success" : "error"
            }
            message={
              submitSuccess ? "Se ha creado la entrega" : "Error creando la entrega"
            }
          />
        )
      }
    </React.Fragment>
  );
}
