import { useState, useRef } from 'react';
import { Setting } from 'react-iconly';
import { useOnClickOutside } from '@hooks';
import { useForm } from 'react-hook-form';
import { Input } from '@components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isEmpty } from 'lodash';
import { useUserDataContext } from '@contexts/user-data';
import { useCustomizerContext } from '@contexts/customizer';
import { SketchPicker } from 'react-color';
import rules from '@common/rules';
import {
  CustomizerContainer,
  CustomizerToggle,
  ColorSelectorList,
  ColorSelectorItem,
} from './styles';

const colorsPallete = [
  '#1ee0e0',
  '#0070f3',
  '#FF8622',
  '#FFB522',
  '#00D084',
  '#9900EF',
  '#EB144C',
  '#ABB8C3',
  '#F78DA7',
  '#8ED1FC',
  '#0693E3',
];

const Customizer = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const customizerRef = useRef();
  const { user } = useUserDataContext();
  const { primaryColor, updateValue } = useCustomizerContext();

  const { register, handleSubmit, formState, watch, errors, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      email: user.email,
      shortBio: user.shortBio,
      largeBio: user.largeBio,
    },
  });

  const { isValid } = formState;

  useOnClickOutside(customizerRef, () => setOpen(false));

  const onUpdateColor = (color) => updateValue({ primaryColor: color });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <CustomizerContainer open={open} ref={customizerRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Portfolio Customizer</h1>
      <h3 className="sub-title">Customize & Save to see changes</h3>
      <CustomizerToggle onClick={handleToggle}>
        <Setting set="bold" className="open-icon" size={28} />
      </CustomizerToggle>
      <PerfectScrollbar
        className="customizer-content"
        options={{
          wheelPropagation: false,
        }}
      >
        <div className="section">
          <h4 className="option-title">Profile Information</h4>
          <Input
            fullWidth
            className="input"
            size="lg"
            placeholder="Name"
            name="name"
            ref={register(rules.name)}
            error={!isEmpty(errors.name) ? errors.name.message : ''}
          />
          <Input
            className="input"
            fullWidth
            size="lg"
            placeholder="Email"
            name="email"
            ref={register(rules.email)}
            error={!isEmpty(errors.email) ? errors.email.message : ''}
          />
          <Input
            className="input"
            fullWidth
            size="lg"
            placeholder="Short Bio"
            name="shortBio"
            ref={register(rules.shortBio)}
            error={!isEmpty(errors.shortBio) ? errors.shortBio.message : ''}
          />
          <Input
            multiline
            className="input"
            fullWidth
            size="lg"
            placeholder="Large Bio"
            name="largeBio"
            ref={register(rules.largeBio)}
            error={!isEmpty(errors.largeBio) ? errors.largeBio.message : ''}
          />
        </div>
        <ColorSelectorList className="section">
          <h4 className="option-title">Primary Color</h4>
          {colorsPallete.map((color) => (
            <ColorSelectorItem
              key={color}
              selected={color === primaryColor}
              onClick={() => onUpdateColor(color)}
              color={color}
            />
          ))}
          <SketchPicker color={primaryColor} onChange={(color) => onUpdateColor(color.hex)} />
          <Input className="input" width="144px" label="#" size="lg" placeholder="FFFFFF" />
        </ColorSelectorList>
        <div className="section">
          <h4 className="option-title">Settings</h4>
          <Input
            className="input"
            fullWidth
            size="lg"
            placeholder="Google Analytics Tracking ID"
            name="ga"
            ref={register(rules.ga)}
            error={!isEmpty(errors.ga) ? errors.ga.message : ''}
          />
          <button disabled={!isValid} className="submit-button" type="submit">
            Save
          </button>
        </div>
      </PerfectScrollbar>
    </CustomizerContainer>
  );
};

export default Customizer;
