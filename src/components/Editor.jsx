import { memo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";

const Editor_ = ({ ...props }) => {
  const { textareaRef, onKeyDown } = useEditorContext();

  return <textarea onKeyDown={onKeyDown} ref={textareaRef} {...props} />;
};

const Editor = memo(Editor_);
export default Editor;
