import DiffViewer from "@/components/DiffViewer/DiffViewer"
import { dummySubmission } from "@/lib/placeholder/submissions"

// TODO: Remove Dummies and connect to backend

export default function Submission() {
    return (
        <div>
            <h1>This is the Submission Page</h1>
            <DiffViewer sources={dummySubmission}/>
        </div>
    )
}