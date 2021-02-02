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
  IconDevcover,
} from '@components/Icons';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'external':
      return <IconExternal {...props} />;
    case 'folder':
      return <IconFolder {...props} />;
    case 'fork':
      return <IconFork {...props} />;
    case 'github':
      return <IconGitHub {...props} />;
    case 'hashnode':
      return <IconHashnode {...props} />;
    case 'devto':
      return <IconDevto {...props} />;
    case 'devcover':
      return <IconDevcover {...props} />;
    case 'linkedin':
      return <IconLinkedin {...props} />;
    case 'Location':
      return <IconLocation {...props} />;
    case 'star':
      return <IconStar {...props} />;
    case 'twitter':
      return <IconTwitter {...props} />;
    case 'zap':
      return <IconZap {...props} />;
    default:
      return <IconExternal {...props} />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
