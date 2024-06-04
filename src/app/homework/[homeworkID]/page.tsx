import { Container } from "@mui/material"
import SubmissionListTable from "@/components/SubmissionListTable/SubmissionListTable"
import { HomeworkSubmissionRequest } from "@/lib/definitions";

async function getSubmissionList(homeworkId: string) {
    console.log(homeworkId);
    const request = await fetch(`http://localhost:5000/api/homework/${homeworkId}/submissions`);

    return request.json() as Promise<HomeworkSubmissionRequest>
}


export default async function Submission({ params }: { params: { homeworkID: string } }) {
    const submissionList = await getSubmissionList(params.homeworkID);

    return (
        <Container component='main'>
            <SubmissionListTable submissionList={submissionList.submissions}/>
        </Container>
    )
}
