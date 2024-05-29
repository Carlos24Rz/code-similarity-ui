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

interface Props {
  onSubmit: () => void;
}

export default function CreateSubmissionDialog(props: Props) {
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

    // TODO: Crear entrega en API

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
            <InputBase required type="file" inputProps={{ accept: ".py" }}/>
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
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
