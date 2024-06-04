import { Container } from "@mui/material"
import HomeworkListTable from "@/components/HomeworkListTable/HomeworkListTable"
import { HomeworkRequest } from "@/lib/definitions"

async function getHomeworkList() {
    const request = await fetch("http://localhost:5000/api/homework");
   
    return request.json() as Promise<HomeworkRequest>
}

export default async function Dashboard() {
    const homeworkRequest = await getHomeworkList()
    return (
        <Container component='main'>
            <HomeworkListTable homeworkList={homeworkRequest.homeworks}/>
        </Container>
    )
}
