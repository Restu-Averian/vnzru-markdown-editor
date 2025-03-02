import { memo } from "react";
import Markdown from "react-markdown";
import { useEditorPreviewContext } from "../context/EditorPreviewContextProvider";

const EditorPreview_ = () => {
  const { value } = useEditorPreviewContext();

  return <Markdown>{value}</Markdown>;
};

const EditorPreview = memo(EditorPreview_);

export default EditorPreview;
