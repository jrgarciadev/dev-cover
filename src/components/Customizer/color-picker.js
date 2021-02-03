/* eslint-disable react/no-array-index-key */
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import { useOnClickOutside } from '@hooks';
import { ColorSelector, ColorSelectorItem } from './styles';

const ColorPicker = ({ selectedColor = '', onChange }) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef();

  useOnClickOutside(pickerRef, () => setOpen(false));

  return (
    <ColorSelector className="section" ref={pickerRef}>
      <h4 className="option-title">Primary Color</h4>
      <ColorSelectorItem onClick={() => setOpen(!open)} color={selectedColor} />
      {open && (
        <TwitterPicker
          color={selectedColor}
          onChangeComplete={(color) => color && color.hex && onChange(color.hex)}
        />
      )}
    </ColorSelector>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
