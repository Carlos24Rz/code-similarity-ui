import { Text } from "@codemirror/state";
import { EditorView, Decoration } from "@codemirror/view";
import { KGramPosition, SubmissionSimilarity } from "@/lib/definitions";

const highlightcolorSet = [
    "#fdff00",
    "#ff9a00",
    "#00ff04",
    "#00c5ff",
    "#ff00a7",
];

const highlightDecorationList: Decoration[] = highlightcolorSet.map(color => 
    Decoration.mark({
        inclusive: true,
        attributes: {
            style: `background-color: ${color};`
        }
    })
);

function computeKGramTextPositon(text: Text, position: KGramPosition){
    const startLine = text.line(position.startLine);
    const endLine = text.line(position.endLine);

    return {
        from: startLine.from + position.startCol,
        to: endLine.from + position.endCol
    };
}

export function getSimmilarityDecorations(
    sources: SubmissionSimilarity
) {
    const submissionA_decorationList = [];
    const submissionB_decorationList = [];

    const submissionA_content = Text.of(sources.submissionA.content.split('\n'));
    const submissionB_content = Text.of(sources.submissionB.content.split('\n'));

    let idx = 0;
    for (let match of sources.matches) {
        const highlightDecoration = highlightDecorationList[idx % highlightDecorationList.length];

        for (let kGramPosition of match.submissionA) {
            const kGramTextPosition = computeKGramTextPositon(submissionA_content, kGramPosition);
            const newDecorationRange = highlightDecoration.range(kGramTextPosition.from, kGramTextPosition.to);
            submissionA_decorationList.push(newDecorationRange);
        }

        for (let kGramPosition of match.submissionB) {
            const kGramTextPosition = computeKGramTextPositon(submissionB_content, kGramPosition);
            const newDecorationRange = highlightDecoration.range(kGramTextPosition.from, kGramTextPosition.to);
            submissionB_decorationList.push(newDecorationRange);
        }

        idx = idx + 1;
    }

    const submissionA_decorationSet = Decoration.set(submissionA_decorationList);
    const submissionB_decorationSet = Decoration.set(submissionB_decorationList);

    return {
        submissionA: EditorView.decorations.of(submissionA_decorationSet),
        submissionB: EditorView.decorations.of(submissionB_decorationSet),
    };
}