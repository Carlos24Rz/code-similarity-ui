import { Container, Grid } from "@mui/material"
import SubmissionListTable from "@/components/SubmissionListTable/SubmissionListTable"
import { DistanceMatrixLink, DistanceMatrixNode, DistanceMatrixRequest, HomeworkSubmissionRequest } from "@/lib/definitions";
import SubmissionListForceGraph from "@/components/SubmissionListForceGraph/SubmissionListForceGraph";

async function getSubmissionList(homeworkId: string) {
    const request = await fetch(`http://localhost:5000/api/homework/${homeworkId}/submissions`);

    return request.json() as Promise<HomeworkSubmissionRequest>
}

async function getSubmissionListMatrix(homeworkId: string) {
    const request = await fetch(`http://localhost:5000/api/homework/${homeworkId}/distance_matrix`);

    const data = await (request.json() as Promise<DistanceMatrixRequest>);

    const nodes: DistanceMatrixNode[] = data.matrix.axis.map((submission) => {
        return ({
          id: submission.id,
          author: submission.author,
          filename: submission.filename
        });
    });

    const links: DistanceMatrixLink[] = [];

    for (let i = 0; i < data.matrix.distance_matrix.length; i++) {
        for (let j = 0; j < data.matrix.distance_matrix[i].length; j++) {
            if (data.matrix.distance_matrix[i][j] !== -1) {
                links.push({
                    source: nodes[i].id,
                    target: nodes[j].id,
                    distance: 100 - data.matrix.distance_matrix[i][j]
                })
            }
        }
    }

    return { nodes, links };

}

export default async function Submission({ params }: { params: { homeworkID: string } }) {
    const submissionList = await getSubmissionList(params.homeworkID);
    const { nodes, links } = await getSubmissionListMatrix(params.homeworkID);

    return (
        <Container component='main' sx={
            {
                mt: 4
            }
        }>
            <Grid container columnGap={2} columns={2}>
                <Grid item>
                    <SubmissionListTable submissionList={submissionList.submissions}/>
                </Grid>
                <Grid item>
                    <SubmissionListForceGraph nodes={nodes} links={links}/>
                </Grid>
            </Grid>
        </Container>
    )
}
