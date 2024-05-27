'use client';
import * as React from 'react';
import { Grid } from '@mui/material';
import { EditorView, basicSetup } from "codemirror";
import { python } from '@codemirror/lang-python';

import CodeEditor from '../CodeEditor/CodeEditor';
import CodeEditorHeaderBar from '../CodeEditorHeaderBar/CodeEditorHeaderBar';


import { SubmissionSimilarity } from '@/lib/definitions';
import { getSimmilarityDecorations } from '@/utils/editorSimmilarityDecorations';


interface Props {
    sources: SubmissionSimilarity
}

export default function DiffViewer(props: Props) {
    const { sources } = props;

    const sourcesSimilarityDecorations = React.useMemo(() => {
        return getSimmilarityDecorations(sources);
    }, []);

    return (
            <Grid container columns={2} spacing={2}>
                <Grid item flex={'1 1 0'}>
                    <CodeEditorHeaderBar filename={sources.submissionA.filename} author={sources.submissionA.filename}/>
                    <CodeEditor
                      content={sources.submissionA.content}
                      extensions={[
                        basicSetup,
                        python(),
                        EditorView.editable.of(false),
                        sourcesSimilarityDecorations.submissionA
                      ]}
                    />
                </Grid>
                <Grid item flex={'1 1 0'}>
                    <CodeEditorHeaderBar filename={sources.submissionB.filename} author={sources.submissionB.filename}/>
                    <CodeEditor
                      content={sources.submissionB.content}
                      extensions={[
                        basicSetup,
                        python(),
                        EditorView.editable.of(false),
                        sourcesSimilarityDecorations.submissionB
                      ]}
                    />
                </Grid>
            </Grid>
    )
}
