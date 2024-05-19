import { Container } from "@mui/material"
import HomeworkListTable from "@/components/HomeworkListTable/HomeworkListTable"


export default function Dashboard() {
    return (
        <Container component='main'>
            <HomeworkListTable />
        </Container>
    )
}