import "./App.css";
import { AlignmentEditor, AlignmentProvider } from "alignment-editor-rcl";

function App() {
  return (
    <div style={{ width: "500px",  overflow: "hidden" }}>
      <AlignmentProvider>
        <AlignmentEditor
          defaultView="line"
          sourceGlosses={[
            { position: 2, glossText: "anyone" },
            { position: 5, glossText: "hearer" },
          ]}
          sourceSegments={[
            { text: "ὅτι" },
            { text: "εἴ" },
            { text: "τις" },
            { text: "ἀκροατὴς" },
            { text: "λόγου" },
            { text: "ἐστὶν" },
          ]}
          targetSegments={[
            { text: "For" },
            { text: "if" },
            { text: "anyone" },
            { text: "is" },
            { text: "a" },
            { text: "hearer" },
          ]}
          userLinks={[
            { sources: [0], targets: [1, 2], type: "manual" },
            { sources: [3], targets: [5], type: "manual" },
          ]}
          stateUpdatedHook={(a) => {
            console.log("STATE UPDATED", a);
          }}
        />
      </AlignmentProvider>
    </div>
  );
}

export default App;
