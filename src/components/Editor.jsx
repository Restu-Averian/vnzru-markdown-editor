import { memo, useMemo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";
import { useEditorPreviewContext } from "../context/EditorPreviewContextProvider";

let timeoutUpdateValue;
const Editor_ = ({ ...props }) => {
  const { textareaRef, onKeyDown } = useEditorContext();

  const { setValue, updateWhen } = useEditorPreviewContext();

  const typeUpdate = useMemo(() => {
    const typeData = ["direct", "blur", "delay"];

    return typeData?.includes(updateWhen?.type) ? updateWhen?.type : "direct";
  }, [updateWhen]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      onKeyDown={(e) => {
        if (typeof props?.onKeyDown === "function") {
          props?.onKeyDown(e);
        }

        onKeyDown(e);
      }}
      onChange={(e, p, q) => {
        if (typeof props?.onChange === "function") {
          props?.onBlur(e);
        }

        if (typeUpdate === "direct") {
          setValue(e?.target?.value);
        } else if (typeUpdate === "delay") {
          timeoutUpdateValue = setTimeout(() => {
            setValue(e?.target?.value);
          }, updateWhen?.time || 250);
        }
      }}
      {...(typeUpdate === "blur" && {
        onBlur: (e) => {
          if (typeof props?.onBlur === "function") {
            props?.onBlur(e);
          }

          setValue(e?.target?.value);
        },
      })}
    />
  );
};

const Editor = memo(Editor_);
export default Editor;
