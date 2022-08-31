import { DeltaBasedEditor } from '@/delta-based-editor';
import { EditorInnerEmitter, EditorInnerEvent, ITextChangeEventProps } from '@/delta-based-editor/modules/emitter/editor-emitter';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledEditorDemo = styled.div`
  p {
      margin: 0;
      padding: 0;
  }

  .button-group {
    display: flex;
    font-size: 12px;

    .button {
      cursor: pointer;
      margin-right: 8px;
      line-height: 28px;
      height: 28px;
      padding: 0 16px;
      background: rgba(51,77,102,.08);
    }
  }

  .editor {
    height: 200px;
    border: 1px solid black;
  }

  .delta {
    margin-top: 20px;
    border: 1px solid black;
  }
`;

const buttons = [
  {
    id: 'undo',
  },
  {
    id: 'redo'
  },
  {
    id: 'bold',
  },
]
export const RichTextEditor: React.FC = () => {
  const editorDomRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<DeltaBasedEditor | null>(null);
  const [content, setContent] = useState('');
  const [diff, setDiff] = useState('');

  const handleTextChange = useCallback((props: ITextChangeEventProps) => {
    const { delta, diffDelta } = props;
    setContent(JSON.stringify(delta, null, 2));
    setDiff(JSON.stringify(diffDelta, null, 2));
  }, []);

  useEffect(() => {
    if (!editorDomRef.current) {
      return;
    }

    const editor = new DeltaBasedEditor({
      id: 'rich-text-editor-demo',
      inputContainer: editorDomRef.current,
    });
    (window as any).editor = editor
    editorRef.current = editor;

    // 注册事件
    editor.innerEmitter.onTextChange(handleTextChange);

    return () => {
      editorRef.current = null;
      editor.innerEmitter.removeListener(EditorInnerEvent.textChange, handleTextChange);
    }
  }, [handleTextChange]);

  const renderButtons = useMemo(() => <div className='button-group'>
    {buttons.map(button => <div key={button.id} className='button' id={button.id}>{button.id}</div>)}
  </div>, []);

  const renderEditor = useMemo(() => <div>
    <p>Editor</p>
    <div className='editor' ref={editorDomRef} />
  </div>, []);

  const renderDelta = useMemo(() => <div className='delta'>
    <div>content: </div>
    <div>{content}</div>
    <div>diff: </div>
    <div>{diff}</div>
  </div>, [content, diff])

  return <StyledEditorDemo>
    {renderButtons}
    {renderEditor}
    {renderDelta}
  </StyledEditorDemo>
}