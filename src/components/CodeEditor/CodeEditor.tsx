'use client';
import * as React from 'react';
import { EditorView } from "codemirror";
import { Text, Extension } from '@codemirror/state';

interface Props {
    content: string | Text
    extensions: Extension[]
}

export default function CodeEditor(props: Props) {
    const { content, extensions } = props;

    const editorParentRef = React.useRef<HTMLDivElement>(null);
    const [ editorView, setEditorView ] = React.useState<EditorView>();

    React.useEffect(() => {
        const newEditorView = new EditorView({
            doc: content,
            parent: editorParentRef.current as HTMLDivElement,
            extensions: extensions
        })

        setEditorView(newEditorView);

        return function cleanup() {
            newEditorView.destroy();
            setEditorView(undefined);
        }
    }, [extensions]);

    return (
        <div id='editor-root' ref={editorParentRef}/>
    );
}
