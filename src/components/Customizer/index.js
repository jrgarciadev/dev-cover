import { useState, useRef, useCallback } from 'react';
import { Setting, CloseSquare } from 'react-iconly';
import { useOnClickOutside } from '@hooks';
import { useForm } from 'react-hook-form';
import { Input, Switch } from '@components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isEmpty } from 'lodash';
import { useUserDataContext } from '@contexts/user-data';
import { useCustomizerContext } from '@contexts/customizer';
import rules from '@common/rules';
import ColorPicker from './color-picker';
import { CustomizerContainer, CustomizerToggle } from './styles';

const Customizer = () => {
  const [open, setOpen] = useState(false);
  const customizerRef = useRef();
  const { user, updateValue: updateUserData } = useUserDataContext();
  const { primaryColor, updateValue } = useCustomizerContext();
  const [localColor, setLocalColor] = useState(() => primaryColor);

  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      email: user.email,
      shortBio: user.shortBio,
      largeBio: user.largeBio,
      isHireable: user?.isHireable,
    },
  });

  const { isValid } = formState;

  useOnClickOutside(customizerRef, () => setOpen(false));

  const handleToggle = () => setOpen(!open);

  const onUpdateColor = useCallback(
    (color) => {
      setLocalColor(color);
      setTimeout(() => {
        updateValue({ primaryColor: color });
      }, 100);
    },
    [localColor],
  );

  const onSubmit = async ({ email, shortBio, largeBio, ga, isHireable }) => {
    user.email = email;
    user.shortBio = shortBio || user.shortBio;
    user.largeBio = largeBio || user.largeBio;
    user.isHireable = isHireable;
    user.ga = ga;
    updateUserData(user);
  };

  return (
    <CustomizerContainer open={open} ref={customizerRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Portfolio Customizer</h1>
      <h3 className="sub-title">Customize & Save to see changes</h3>
      <CloseSquare
        set="bold"
        size={28}
        primaryColor="#ff4d4f"
        className="close-button"
        onClick={() => setOpen(false)}
      />
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
            required
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
          <Switch fullWidth ref={register} name="isHireable" label="Open for new opportunities" />
        </div>
        <ColorPicker selectedColor={localColor} onChange={onUpdateColor} />
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
