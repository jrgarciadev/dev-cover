/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { InputWrapper, Label } from './styles';

const Input = forwardRef(
  (
    {
      name,
      autoHeight,
      autoFocus,
      children,
      disabled,
      fullWidth,
      error,
      shadow = true,
      iconCursor,
      icon,
      multiline = false,
      rows = 2,
      rightIcon,
      onChange,
      onBlur,
      onFocus,
      maxLength,
      placeholder,
      onPaste,
      width,
      type,
      label,
      value,
      size,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(() => autoFocus);

    const input = useRef(null);

    const handleChange = (event) => {
      onChange(event.target.value);
    };

    const handleTextAreaAdjust = () => {
      if (!input || !input.current || !multiline || !autoHeight) return;
      const { current } = input;
      current.style.height = 'auto';
      current.style.height = `${25 + current.scrollHeight}px`;
    };

    const handleFocus = (event) => {
      setFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event) => {
      setFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    let InputComponent = 'input';

    if (multiline) {
      InputComponent = 'textarea';
    }

    return (
      <InputWrapper
        width={width}
        shadow={shadow}
        size={size}
        multiline={multiline}
        fullWidth={fullWidth}
        disabled={disabled}
        focused={focused}
        error={error}
        iconCursor={iconCursor}
        className={className}
      >
        {icon && <span className="icon">{icon}</span>}
        {label && <Label>{label}</Label>}
        <div className="input-wrapper">
          <InputComponent
            onKeyUp={handleTextAreaAdjust}
            name={name}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            rows={rows}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxLength}
            onBlur={handleBlur}
            onChange={onChange ? handleChange : null}
            onFocus={handleFocus}
            onPaste={onPaste}
            placeholder={placeholder}
            ref={ref || input}
            type={type || 'text'}
            value={value}
            style={style}
            {...props}
          />
          {children}
          {error && <span className="error-label">{error}</span>}
        </div>
        {rightIcon && <span className="icon">{rightIcon}</span>}
      </InputWrapper>
    );
  },
);

Input.propTypes = {
  shadow: PropTypes.bool,
  autoHeight: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconCursor: PropTypes.string,
  icon: PropTypes.node,
  innerRef: PropTypes.func,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onPaste: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
};

export default Input;
