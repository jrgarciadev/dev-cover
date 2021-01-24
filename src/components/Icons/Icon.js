import PropTypes from 'prop-types';
import {
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconDevto,
  IconLinkedin,
  IconLocation,
  IconHashnode,
  IconStar,
  IconTwitter,
  IconZap,
} from '@components/Icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'github':
      return <IconGitHub />;
    case 'hashnode':
      return <IconHashnode />;
    case 'devto':
      return <IconDevto />;
    case 'linkedin':
      return <IconLinkedin />;
    case 'Location':
      return <IconLocation />;
    case 'Star':
      return <IconStar />;
    case 'twitter':
      return <IconTwitter />;
    case 'Zap':
      return <IconZap />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
