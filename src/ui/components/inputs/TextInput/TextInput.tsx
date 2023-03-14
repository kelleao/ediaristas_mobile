import React from 'react';
import { View } from 'react-native';
import { TextInputStyled, HelperTextStyled } from './TextInput.style';

export type TextInputProps = {
    helperText?: string;
};

const TextInput: React.FC<TextInputProps> = ({ helperText, ...props }) => {
    return (
        <View>
            <TextInputStyled {...props} />
            {/* @ts-ignore */}
            {helperText ? (
                <HelperTextStyled type="error">{helperText}</HelperTextStyled>
            ) : null}
        </View>
    );
};

const TextInputRef = React.forwardRef((props: TextInputProps, ref: any) => (
    <View ref={ref}>
        <TextInput {...props} />
    </View>
));

export default TextInputRef;
