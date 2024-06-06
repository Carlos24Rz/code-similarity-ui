import * as D3 from 'd3';

export interface Submission {
    id: string;
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
    submissions: number;
    highSimilarity: number;
    mediumSimilarity: number;
    lowSimilarity: number;
    notSimilarity: number;

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

export interface DistanceMatrix {
  axis: Omit<Submission, "content">[];
  distance_matrix: number[][];
}

export interface DistanceMatrixRequest {
  message: string;
  matrix: DistanceMatrix;
}

export interface DistanceMatrixNode extends D3.SimulationNodeDatum {
    id: string;
    author: string;
    filename: string;
}

export interface DistanceMatrixLink extends D3.SimulationLinkDatum<DistanceMatrixNode>{
    source: string;
    target: string;
    distance: number;
}
