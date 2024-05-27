import { Paper, Container, Box, Typography, Chip, Grid } from "@mui/material"
import { InsertDriveFileOutlined, PermIdentityOutlined } from "@mui/icons-material"
import DiffViewer from "@/components/DiffViewer/DiffViewer"
import AnimatedCircularProgress from "@/components/AnimatedCircularProgress/AnimatedCircularProgress"
import { dummySubmission } from "@/lib/placeholder/submissions"

// TODO: Remove Dummies and connect to backend

export default function Submission() {
    return (
        <Container>
            <Paper sx={{
                px: 4,
                pt: 2,
                pb: 6,
            }}>
                <Box
                  sx={{
                    mt: 3
                  }}
                >
                  <Typography color="primary" fontWeight={500} variant="h4" component="h1">Reporte de Similitud</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 3,
                    pr: 10
                  }}
                >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,
                        pl: 2
                      }}
                    >
                      <Typography variant="h4" component="h2">
                          {dummySubmission.submissionA.filename}
                      </Typography>
                      {dummySubmission.similarity >= 0.75 ? (
                          <Chip label='Similitud Alta' color='error' size="small" sx={{fontSize: 12, fontWeight: 500}}/>
                      ) : (dummySubmission.similarity >= 0.5 && dummySubmission.similarity < 0.75) ? (
                          <Chip label='Similitud Media' color='warning' size="small" sx={{fontSize: 12, fontWeight: 500}}/>
                      ) : (
                          <Chip label='Similitud Baja' color="primary" size="small" sx={{fontSize: 12, fontWeight: 500}}/>
                      )}
                    </Box>
                    <AnimatedCircularProgress
                        variant="determinate"
                        size="8rem"
                        value={dummySubmission.similarity * 100}
                        color={
                            dummySubmission.similarity >= 0.75 ? "error"
                            : (dummySubmission.similarity >= 0.5 && dummySubmission.similarity < 0.75) ? "warning"
                            : "primary"
                        }
                        labelSize={32}
                    />
                </Box>
                <Box sx={{
                  mt: 3
                }}
                >
                  <Grid container justifyContent="space-between" sx={{ pr: 4 }}>
                    <Grid item>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            mb: 1,
                          }}
                          variant="h4"
                          component="h2"
                        >
                          Detalles
                        </Typography>
                        <Box
                          sx={{
                            pl: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 1  }}>
                            <InsertDriveFileOutlined color="primary"/>
                            <Typography color="gray" fontWeight={500} >{dummySubmission.submissionA.filename}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1  }}>
                            <PermIdentityOutlined color="primary"/>
                            <Typography color="gray" fontWeight={500} >{dummySubmission.submissionA.author}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            mb: 1
                          }}
                          variant="h4"
                          component="h2"
                        >
                          Entrega con mayor similitud
                        </Typography>
                        <Box
                          sx={{
                            pl: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <InsertDriveFileOutlined color="primary"/>
                            <Typography color="gray" fontWeight={500} >{dummySubmission.submissionB.filename}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <PermIdentityOutlined color="primary"/>
                            <Typography color="gray" fontWeight={500} >{dummySubmission.submissionB.author}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                    variant="h4"
                    component="h2"
                  >
                    Comparativa
                  </Typography>
                  <Typography 
                  sx={{
                    mt: 1,
                    mb: 2,
                    px: 0.5,
                    color: "gray",
                    fontWeight: 700
                  }}
                  variant="subtitle2" component="p">
                    La vista de comparación entre los 2 archivos analizados. Cada sección resaltada representa un
                    fragmento de código con una similitud significativa.
                  </Typography>
                  <DiffViewer sources={dummySubmission} />
                </Box>
            </Paper>
        </Container>
    )
}
