import { INIT_VALUE, SUGGEST_TAG_LIST } from '@/editor/feature/tag/constant';
import { insertTag, Tag, withTags } from '@/editor/feature/tag/tag';
import { StyledEditor } from '@/editor/styled';
import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Descendant, Editor, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';

const EditorContainer = () => {
    const editor = useMemo(() => withTags(withReact(withHistory(createEditor()))), []);
    const [target, setTarget] = useState<Range | null>(null);
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState('');

    const suggestions = useMemo(() => {
        if (!search) {
            return SUGGEST_TAG_LIST;
        }

        return SUGGEST_TAG_LIST.filter((tag) => tag.toLowerCase().startsWith(search.toLowerCase()));
    }, [search]);

    const renderElement = useCallback((props: RenderElementProps) => {
        const { attributes, children, element } = props;
        switch (element.type) {
            case 'tag': {
                return <Tag {...props} />;
            }
            default: {
                return <p {...attributes}>{children}</p>;
            }
        }
    }, []);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    const prevIndex = index >= suggestions.length - 1 ? 0 : index + 1;
                    setIndex(prevIndex);
                    return;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    const nextIndex = index <= 0 ? suggestions.length - 1 : index - 1;
                    setIndex(nextIndex);
                    return;
                }
                case 'Tab':
                case 'Enter': {
                    event.preventDefault();

                    if (target) {
                        Transforms.select(editor, target);
                    }
                    insertTag(editor, suggestions[index]);
                    setTarget(null);
                    return;
                }
            }
        },
        [index, target, editor, suggestions],
    );

    const handleChange = useCallback((value: Descendant[]) => {
        const { selection } = editor;
        if (!selection || !Range.isCollapsed(selection)) {
            setTarget(null);
            return;
        }

        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (!beforeMatch || !afterMatch) {
            setTarget(null);
            return;
        }

        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
    }, [editor]);

    const handleMouseDown = useCallback(
        (index: number, event: React.MouseEvent) => {
            event.preventDefault();
            Transforms.move(editor);
            insertTag(editor, suggestions[index]);
        },
        [editor, suggestions],
    );

    return (
        <StyledEditor className="editor">
            <div className="editor-title">Slate 编辑器</div>
            <div className="header">
                <Slate editor={editor} value={INIT_VALUE} onChange={handleChange}>
                    <Editable
                        style={{
                            height: '100%',
                        }}
                        renderElement={renderElement}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter some text..."
                    />
                </Slate>
            </div>
            <div className="body">
                <div className="sidebar">
                    <div className="group">
                        <div className="group-header">选项</div>
                        {suggestions.length ? (
                            <div className="suggestion-list">
                                {suggestions.map((suggestion, idx) => {
                                    const isActive = idx === index;
                                    return (
                                        <div
                                            className={`suggestion ${isActive ? 'active' : ''}`}
                                            key={suggestion}
                                            onMouseOver={() => setIndex(idx)}
                                            onMouseDown={(event) => handleMouseDown(idx, event)}
                                        >
                                            <span className="title">{suggestion}</span>
                                            {!isActive ? null : <div className="tip">回车</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="empty">暂无选项</div>
                        )}
                    </div>
                </div>
                <div className="detail">index: {index}</div>
            </div>
        </StyledEditor>
    );
};

export default EditorContainer;
