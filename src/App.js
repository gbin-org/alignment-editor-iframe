import "./App.css";
import { AlignmentEditor, AlignmentProvider } from "alignment-editor-rcl";

const getText = (type) => {
  const url = new URL(window.location.href);
  const textString = url.searchParams.get(`${type}Text`);
  if (textString) {
    return textString.split("|").map((textPiece) => {
      return { text: textPiece };
    });
  }
};

const getSourceGlosses = () => {
  const url = new URL(window.location.href);
  const glosses = url.searchParams.get(`sourceGlosses`);
  console.log(glosses);
  if (glosses) {
    return glosses
      .split("|")
      .map((glossPiece, position) => {
        if (glossPiece !== "null") {
          return { position: position, glossText: glossPiece };
        }
        return null;
      })
      .filter(Boolean);
  }
};

const getLinks = () => {
  const url = new URL(window.location.href);
  const links = url.searchParams.get(`links`);
  if (links) {
    return links.split("|").map((linkText) => {
      const parts = linkText.split(":");
      const sourceLinks = parts[0].split(",").map((string) => Number(string));
      const targetLinks = parts[1].split(",").map((string) => Number(string));
      return { sources: sourceLinks, targets: targetLinks, type: "manual" };
    });
  }
};

function App() {
  return (
    <div style={{ width: "500px", overflow: "hidden" }}>
      <AlignmentProvider>
        <AlignmentEditor
          defaultView="line"
          sourceGlosses={getSourceGlosses()}
          sourceSegments={getText("source")}
          targetSegments={getText("target")}
          userLinks={getLinks()}
          stateUpdatedHook={(a) => {
            console.log("STATE UPDATED", a);
          }}
        />
      </AlignmentProvider>
    </div>
  );
}

export default App;
