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
  Box,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Alert from '../Alert/Alert';

interface Props {
  onSubmit: () => void;
}

export default function CreateHomeworkDialog(props: Props) {
  const { onSubmit } = props;

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

    const formData = new FormData(event.currentTarget);

    const newHomework = {
      "name": formData.get('title')
    };

    const request = await fetch("http://localhost:5000/api/homework", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newHomework)
    });

    setIsLoading(false);
    setSubmit(true);

    if(!request.ok) {
      // Show Message error
      setSubmitSuccees(false);
      return;
    }

    setSubmitSuccees(true);

    // Show Success Message

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
        Crear Tarea
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
            name='title'
            label="Título"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Crear Tarea
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
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
      {
        submit && (
          <Alert
            severity={
              submitSuccess ? "success" : "error"
            }
            message={
              submitSuccess ? "Se ha creado la tarea" : "Error creando la tarea"
            }
          />
        )
      }
    </React.Fragment>
  );
}
