// src/CustomInputBox.tsx
import React, { forwardRef, ChangeEvent, FocusEvent, CSSProperties } from 'react';

interface CustomInputBoxProps {
    label?: string;
    type?: string
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    inputStyle?: CSSProperties;
    labelStyle?: CSSProperties;
    inputClass?: string;
    labelClass?: string;
    containerStyle?: CSSProperties;
}

const CustomInputBox = forwardRef<HTMLInputElement, CustomInputBoxProps>(({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    inputStyle,
    labelStyle,
    inputClass,
    labelClass,
    containerStyle,
    ...props
}, ref) => {
    return (
        <div className="custom-input-box flex flex-col text-dark-color dark:text-light-color gap-y-[2px]" style={containerStyle}>
            {label && <label className={`text-sm capitalize ${labelClass}`} style={labelStyle}>{label}</label>}
            <input
                {...props}
                type={type}
                ref={ref}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                style={inputStyle}
                className={`rounded-md border-[#D0D5DD] border-1 border-solid px-3 py-1 placeholder:text-[#667085] focus:border-[#333741] dark:border-[#333741] outline-none ${inputClass}`}
            />
        </div>
    );
});

CustomInputBox.displayName = 'CustomInputBox';

export default CustomInputBox;
