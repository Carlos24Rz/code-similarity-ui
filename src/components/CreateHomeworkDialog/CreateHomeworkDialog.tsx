'use client';
import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box
} from '@mui/material';
import { Add } from '@mui/icons-material';

interface Props {
  onSubmit: () => void;
}

export default function CreateHomeworkDialog(props: Props) {
  const { onSubmit } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // TODO: Crear tarea en API
    
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
        <DialogTitle>Crear Tarea</DialogTitle>
        <DialogContent>
          <Box>
            <DialogContentText>
              Escribe el título de la tarea a crear.
            </DialogContentText>
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" type="submit">Crear Tarea</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
