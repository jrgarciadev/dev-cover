import { useState } from 'react';
import { NumberedHeading, SectionButton } from '@common/styles';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useUIContext } from '@contexts/ui';
import { Plus } from 'react-iconly';
import { withTheme } from 'styled-components';
import { updateUser } from '@services/user';
import { useToasts } from '@contexts/toasts';
import { useUserDataContext } from '@contexts/user-data';
import { useInputValue } from '@hooks';
import { isEmpty } from 'lodash';

import {
  StyledAboutSection,
  StyledMarkdown,
  Container,
  EditContainer,
  EditActions,
} from './styles';

const ActionButtons = dynamic(() => import('@components/ActionButtons'));
const Input = dynamic(() => import('@components/Input'));

const About = ({ user = {}, theme }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { value: userReadme, onChange } = useInputValue(user.readme);
  const { updateValue: updateUserData } = useUserDataContext();
  const { ToastsType, addToastWithTimeout } = useToasts();
  const { isEditable } = useUIContext();

  const onUpdateUser = async (input) => {
    setLoading(true);
    try {
      const res = await updateUser(user.username, input);
      setLoading(false);
      if (res.success) {
        setEditMode(false);
        addToastWithTimeout(ToastsType.SUCCESS, 'Profile Saved');
      } else {
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
    }
  };
  const onSubmit = async () => {
    const input = { readme: userReadme, showAbout: !isEmpty(userReadme) };
    updateUserData({ ...user, ...input });
    await onUpdateUser(input);
  };

  const handleDelete = async () => {
    const input = { showAbout: false };
    updateUserData({ ...user, ...input });
    await onUpdateUser(input);
  };

  const handleAddAboutSection = async () => {
    const input = { showAbout: true };
    updateUserData({ ...user, ...input });
    await onUpdateUser(input);
  };

  if (!user?.showAbout && isEditable) {
    return (
      <SectionButton>
        <button onClick={handleAddAboutSection} type="button">
          <Plus />
          {loading ? 'Adding...' : 'Add about section'}
        </button>
      </SectionButton>
    );
  }

  return (
    <StyledAboutSection id="about">
      <NumberedHeading>About Me</NumberedHeading>
      <Container>
        {isEditable && !editMode && (
          <ActionButtons
            hideMove
            showEdit
            onEdit={() => setEditMode(true)}
            onDelete={handleDelete}
          />
        )}
        {editMode ? (
          <EditContainer>
            <Input
              required
              placeholder="## Hi there 👋🏼"
              size="lg"
              fullWidth
              multiline
              rows="14"
              name="readme"
              value={userReadme}
              onChange={onChange}
              style={{ color: theme.text.default }}
            />
            <EditActions>
              <button className="cancel-button" type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button type="button" onClick={onSubmit}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </EditActions>
          </EditContainer>
        ) : (
          <StyledMarkdown isGenerator={isEditable}>
            <ReactMarkdownWithHtml unwrapDisallowed allowDangerousHtml>
              {user?.readme}
            </ReactMarkdownWithHtml>
          </StyledMarkdown>
        )}
      </Container>
    </StyledAboutSection>
  );
};

About.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.object.isRequired,
};
export default withTheme(About);
