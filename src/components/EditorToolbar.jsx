import { memo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";
import { listToolbar } from "../constants";

const EditorToolbar_ = () => {
  const { onActionButton, customActionDatas } = useEditorContext();

  return (
    <div className="__vnzru-editor_toolbar-wrapper__">
      {listToolbar?.map((toolbar, key) => {
        return (
          <button
            className="__vnzru-editor_toolbar-btn__"
            key={key}
            onClick={(e) => {
              onActionButton({ type: toolbar?.type, e });
            }}
          >
            {toolbar?.toolbarText}
          </button>
        );
      })}

      {customActionDatas?.map((action, key) => {
        return (
          <button
            className="__vnzru-editor_toolbar-btn__"
            key={key}
            onClick={(e) => {
              e?.preventDefault();

              if (typeof action?.onClickToolbar === "function") {
                action?.onClickToolbar(e);
              } else {
                onActionButton({ type: action?.name, e });
              }
            }}
          >
            {action?.toolbarText}
          </button>
        );
      })}
    </div>
  );
};

const EditorToolbar = memo(EditorToolbar_);

export default EditorToolbar;
