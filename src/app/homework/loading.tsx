import { CircularProgress, Container } from "@mui/material"

export default function Loading() {
  return (
    <Container
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: 'center',
      alignItems: "center"
    }}
    >
      <CircularProgress size={100}/>
    </Container>
  )
}