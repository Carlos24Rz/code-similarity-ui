import { Paper, Container, Box, Typography } from "@mui/material"
import DiffViewer from "@/components/DiffViewer/DiffViewer"
import { SubmissionSimilarityRequest } from "@/lib/definitions"

// TODO: Move to utils
async function getSubmission(homeworkID: string, submissionID: string) {
  const request = await fetch(`http://localhost:5000/api/submission/${submissionID}/${homeworkID}`);
 
  return request.json() as Promise<SubmissionSimilarityRequest>
}

export default async function Submission({ params }: { params: { homeworkID: string; submissionID: string; } }) {
    const { submission_similarity} = await getSubmission(params.homeworkID, params.submissionID);
    const submission = submission_similarity;

    return (
        <Box
          sx={{
            maxWidth: "calc(100% - 360px)",
            minHeight: "100vh",
            paddingTop: "auto"
          }}
        >
            <Paper sx={{
                px: 4,
                pt: 2,
                pb: 6,
            }}>
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
                  <DiffViewer sources={submission} />
                </Box>
            </Paper>
        </Box>
    )
}
