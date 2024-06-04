export interface Submission {
    id: number;
    filename: string;
    content: string;
    author: string;
}

export interface KGramPosition {
    startLine: number;
    startCol: number;
    endLine: number;
    endCol: number;
}

export interface KGramHashMatches {
    hash: string;
    submissionA: KGramPosition[];
    submissionB: KGramPosition[];
}

export interface SubmissionSimilarity {
    id: number;
    similarity: number;
    submissionA: Submission;
    submissionB: Submission;
    matches: KGramHashMatches[]
}

export interface SubmissionSimilarityRequest {
  message: string;
  submission_similarity: SubmissionSimilarity;
}

export interface Homework {
    homework_id: string;
    name: string;
}

export interface HomeworkRequest {
    homeworks: Homework[];
    message: string;
}

export interface HomeworkSubmission {
    id: number;
    filename: string;
    author: string;
    similarityStatus: number;
}

export interface HomeworkSubmissionRequest {
    submissions: HomeworkSubmission[];
    message: string;
}
