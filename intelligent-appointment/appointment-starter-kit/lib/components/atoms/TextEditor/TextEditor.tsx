import React, { FC, FormEvent } from 'react';
import { TextField, mergeStyleSets } from '@fluentui/react';
import type { ITextEditorProps } from './TextEditor.interface';
import { textEditorStyles } from './TextEditor.style';

export const TextEditor: FC<ITextEditorProps> = props => {
    const { label, onChange } = props;

    const textEditorMergedStyles = mergeStyleSets(textEditorStyles, props.styles);

    const onChangeHandler = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => onChange?.(value, event);

    return (
        <TextField
            rows={5}
            multiline
            autoAdjustHeight
            data-testid="text-editor"
            {...props}
            label={label}
            onChange={onChangeHandler}
            styles={textEditorMergedStyles}
        />
    );
};

export default TextEditor;
