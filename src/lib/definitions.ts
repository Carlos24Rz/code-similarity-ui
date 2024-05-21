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