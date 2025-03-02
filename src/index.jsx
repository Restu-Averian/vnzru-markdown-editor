import { forwardRef, memo } from "react";
import Editor from "./components/Editor";
import EditorContextProvider from "./context/EditorContextProvider";
import EditorToolbar from "./components/EditorToolbar";

const VNZRU_MarkdownEditor_ = ({ ...props }, ref) => {
  return (
    <EditorContextProvider textareaRefOut={ref}>
      <EditorToolbar />
      <Editor />
    </EditorContextProvider>
  );
};

const VNZRU_MarkdownEditor = memo(forwardRef(VNZRU_MarkdownEditor_));
export default VNZRU_MarkdownEditor;
