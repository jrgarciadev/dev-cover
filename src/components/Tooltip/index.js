import PropTypes from 'prop-types';
import { Tooltip as Tippy } from 'react-tippy';

const Tooltip = ({ content, children, position = 'bottom', ...rest }) => {
  return (
    <Tippy
      style={{ display: 'inline-flex', fontSize: '2rem' }}
      arrow="true"
      title={content}
      position={position}
      trigger="mouseenter"
      {...rest}
    >
      {children}
    </Tippy>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Tooltip;
