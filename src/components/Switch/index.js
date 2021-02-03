import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { getRandomId } from '@utils';
import { SwitchContainer, SwitchLabel, SwitchInput } from './styles';

const Switch = forwardRef(({ name, label, value = '', fullWidth, checked, ...props }, ref) => {
  const id = getRandomId();
  return (
    <SwitchContainer fullWidth={fullWidth}>
      <SwitchInput
        {...props}
        ref={ref}
        name={name}
        type="checkbox"
        id={`switch-${id}`}
        value={value}
        checked={checked && 'checked'}
      />
      <SwitchLabel htmlFor={`switch-${id}`}>{label}</SwitchLabel>
    </SwitchContainer>
  );
});

Switch.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  checked: PropTypes.bool,
};

export default Switch;
