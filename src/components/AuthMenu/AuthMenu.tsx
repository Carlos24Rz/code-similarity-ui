'use client';
import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

/*
TODO: Remove Dummy User
TODO: Implement logout function
*/

const dummyUser = {
    'user': 'Luciano'
}

export default function AuthMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
      <div>
          <Button
            sx={{
              color: 'primary.contrastText'
            }}
            endIcon={<KeyboardArrowDown />}
            onClick={handleClick}
          >
            {`Bienvenido, ${dummyUser.user}`}
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>Cerrar Sesión</MenuItem>
          </Menu>
      </div>
  )

}