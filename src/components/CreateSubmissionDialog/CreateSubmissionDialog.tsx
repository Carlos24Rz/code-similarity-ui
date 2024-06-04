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
  InputBase
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useParams } from 'next/navigation';

interface Props {
  onSubmit: () => void;
}

export default function CreateSubmissionDialog(props: Props) {
  const { onSubmit } = props;
  const params = useParams<{ homeworkID: string; }>()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Crear entrega en API
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

    console.log(request.ok);

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
          <Button variant="contained" type="submit">Subir Archivo</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
