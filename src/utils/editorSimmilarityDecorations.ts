import { Text } from "@codemirror/state";
import { EditorView, Decoration } from "@codemirror/view";
import { KGramPosition, SubmissionSimilarity } from "@/lib/definitions";

export const highlightcolorSet = [
    "#fdff00",
    "#ff9a00",
    "#00ff04",
    "#00c5ff",
    "#ff00a7",
    "#8cff32",
    "#ff1837",
    "#840933",
    "#b000ff",
    "#efc8ff"
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
    sources: SubmissionSimilarity,
    filterHashes: Set<string>
) {
    const submissionA_decorationList = [];
    const submissionB_decorationList = [];

    const submissionA_lines = sources.submissionA.content.split(/\r\n|\r|\n/)
    const submissionB_lines = sources.submissionB.content.split(/\r\n|\r|\n/)

    const submissionA_content = Text.of(submissionA_lines);
    const submissionB_content = Text.of(submissionB_lines);

    for (let idx = 0; idx < sources.matches.length; idx++) {
        const match = sources.matches[idx];
        
        if (!filterHashes.has(match.hash)){
          continue;
        }

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
    }

    const submissionA_decorationSet = Decoration.set(submissionA_decorationList, true);
    const submissionB_decorationSet = Decoration.set(submissionB_decorationList, true);

    return {
        submissionA: EditorView.decorations.of(submissionA_decorationSet),
        submissionB: EditorView.decorations.of(submissionB_decorationSet),
    };
}
