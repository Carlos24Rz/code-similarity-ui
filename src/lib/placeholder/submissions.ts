import { SubmissionSimilarity, Submission, KGramHashMatches, KGramPosition } from "../definitions";

const SubmissionA: Submission = {
    id: 0,
    filename: 'test.py',
    content: `def factorial(n, acc = 1):
  if n == 0:
    return acc
  
  return factorial(n-1, n*acc)
  
print(factorial(10))`,
    author: 'Carlos Ruiz'
};

const SubmissionB: Submission = {
    id: 1,
    filename: 'test1.py',
    content: `def factorial(n):
  if n == 0:
    return 1
  
  return n * factorial(n-1)
  
print(factorial(10))`,
    author: 'Daniel Perez'
};

const KGramPosition_SubmissionA_1: KGramPosition = {
    startLine: 2,
    startCol: 2,
    endLine: 3,
    endCol: 14
};

const KGramPosition_SubmissionB_1: KGramPosition = {
    startLine: 2,
    startCol: 2,
    endLine: 3,
    endCol: 12
};

const KGramPosition_SubmissionA_2: KGramPosition = {
    startLine: 7,
    startCol: 0,
    endLine: 7,
    endCol: 20
};

const KGramPosition_SubmissionB_2: KGramPosition = {
    startLine: 7,
    startCol: 0,
    endLine: 7,
    endCol: 20
};

const SubmissionKGramMatch_1: KGramHashMatches = {
    hash: 'foobar',
    submissionA: [KGramPosition_SubmissionA_1],
    submissionB: [KGramPosition_SubmissionB_1]
}

const SubmissionKGramMatch_2: KGramHashMatches = {
    hash: 'barfoo',
    submissionA: [KGramPosition_SubmissionA_2],
    submissionB: [KGramPosition_SubmissionB_2]
}

export const dummySubmission: SubmissionSimilarity = {
    id: 0,
    similarity: 0.75,
    submissionA: SubmissionA,
    submissionB: SubmissionB,
    matches: [SubmissionKGramMatch_1, SubmissionKGramMatch_2]
};

