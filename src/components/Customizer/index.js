import { useState, useRef, useCallback } from 'react';
import { Setting, CloseSquare } from 'react-iconly';
import { useOnClickOutside, useBodyScroll } from '@hooks';
import { useForm } from 'react-hook-form';
import { Input, Switch } from '@components';
import { isEmpty } from 'lodash';
import fetchAPI from '@lib/fetch-api';
import { useToasts } from '@contexts/toasts';
import { useUserDataContext } from '@contexts/user-data';
import { useCustomizerContext } from '@contexts/customizer';
import rules from '@common/rules';
import ColorPicker from './color-picker';
import { CustomizerContainer, CustomizerToggle } from './styles';

const Customizer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const customizerRef = useRef();
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const { ToastsType, addToastWithTimeout } = useToasts();
  const { user, updateValue: updateUserData } = useUserDataContext();
  const { primaryColor, updateValue } = useCustomizerContext();
  const [localColor, setLocalColor] = useState(() => primaryColor);

  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: user.name,
      email: user.email,
      shortBio: user.shortBio,
      largeBio: user.largeBio,
      isHireable: user?.isHireable,
      ga: user.ga,
    },
  });

  const { isValid } = formState;

  useOnClickOutside(customizerRef, () => {
    setOpen(false);
    setBodyHidden(false);
  });

  const handleToggle = () => {
    setBodyHidden(!open);
    setOpen(!open);
  };

  const onUpdateColor = useCallback(
    (color) => {
      setLocalColor(color);
      setTimeout(() => {
        updateValue({ primaryColor: color });
      }, 100);
    },
    [localColor],
  );

  const onSubmit = async ({ name, email, shortBio, largeBio, ga, isHireable }) => {
    setLoading(true);
    const input = {
      username: user.username,
      name,
      email,
      shortBio: shortBio || user.shortBio,
      largeBio: largeBio || user.largeBio,
      ga,
      isHireable,
      primaryColor: localColor,
    };
    user.name = input.name;
    user.email = input.email;
    user.shortBio = input.shortBio;
    user.largeBio = input.largeBio;
    user.isHireable = input.isHireable;
    user.ga = input.ga;
    user.primaryColor = input.primaryColor;
    updateUserData(user);
    fetchAPI('/user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(input),
      throwOnHTTPError: true,
    })
      .then((res) => {
        setLoading(false);
        setOpen(false);
        setBodyHidden(false);
        if (res.success) {
          addToastWithTimeout(ToastsType.SUCCESS, 'Profile Saved');
        } else {
          addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setOpen(false);
        setBodyHidden(false);
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
      });
  };

  return (
    <CustomizerContainer open={open} ref={customizerRef}>
      <h1 className="title">Portfolio Customizer</h1>
      <h3 className="sub-title">Customize & Save to see changes</h3>
      <CloseSquare
        set="bold"
        size={28}
        primaryColor="#ff4d4f"
        className="close-button"
        onClick={() => {
          setOpen(false);
          setBodyHidden(false);
        }}
      />
      <CustomizerToggle onClick={handleToggle}>
        <Setting set="bold" className="open-icon" size={28} />
      </CustomizerToggle>
      <div className="customizer-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <h4 className="option-title">Profile Information</h4>
            <h5 className="field-title">Name</h5>
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
            <h5 className="field-title">Email</h5>
            <Input
              className="input"
              fullWidth
              size="lg"
              placeholder="Email"
              name="email"
              ref={register(rules.email)}
              error={!isEmpty(errors.email) ? errors.email.message : ''}
            />
            <h5 className="field-title">Page Title</h5>
            <Input
              className="input"
              fullWidth
              size="lg"
              placeholder="Page Title"
              name="shortBio"
              ref={register(rules.shortBio)}
              error={!isEmpty(errors.shortBio) ? errors.shortBio.message : ''}
            />
            <h5 className="field-title">Bio</h5>
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
            <h5 className="field-title">Google Analytics Tracking ID</h5>
            <Input
              className="input"
              fullWidth
              size="lg"
              placeholder="UA-XXXXX"
              name="ga"
              ref={register(rules.ga)}
              error={!isEmpty(errors.ga) ? errors.ga.message : ''}
            />
            <button disabled={!isValid} type="submit" className="submit-button">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CustomizerContainer>
  );
};

export default Customizer;
