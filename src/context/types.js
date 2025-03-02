/**
 * @typedef {Object} EditorContextData
 * @property {(param: { type:string; e:HTMLTextAreaElement } )=>void} onActionButton
 *
 * @property {(param: { format:string, formatSuffix?:string; allowSuffixEmpty?: boolean } )=>void} onFormat
 *
 * @property {()=>{ beforeSelected:string; selectedText:string; beforeSelected:string; selectionStart: number; selectionEnd: number; value: string   }} onGetTextData
 *
 * @property {(e: React.KeyboardEvent)=>void} onKeyDown
 *
 * @property {import("vnzru-markdown_editor").customActionsProps[]} customActionDatas
 */

export {};
