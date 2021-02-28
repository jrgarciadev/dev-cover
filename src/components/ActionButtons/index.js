import { Tooltip } from '@components';
import PropTypes from 'prop-types';
import { Delete, Iconly } from 'react-iconly';
import { isFunction } from 'lodash';
import { useIsMobile } from '@hooks';
import { ActionContainer } from './styles';

// eslint-disable-next-line react/prop-types
const IconTooltip = ({ content, children }) => (
  <Tooltip size="big" position="right" content={content}>
    {children}
  </Tooltip>
);

const ActionButtons = ({
  index = 0,
  showRight = true,
  showLeft = true,
  onlyDownUp = false,
  id = '',
  onMove,
  onDelete,
}) => {
  const isMobile = useIsMobile();
  const handleMove = (direction) => {
    if (!isFunction(onMove)) return;
    onMove({ index, id, direction });
  };

  const handleDelete = () => {
    if (!isFunction(onDelete)) return;
    onDelete(id);
  };
  return (
    <ActionContainer>
      <IconTooltip content={isMobile || onlyDownUp ? 'Move Up' : 'Move left'}>
        {showLeft && (
          <Iconly
            name={isMobile || onlyDownUp ? 'ChevronUp' : 'ChevronLeft'}
            onClick={() => handleMove('left')}
            className="chevron-icon"
            set="bold"
          />
        )}
      </IconTooltip>
      <IconTooltip content={isMobile || onlyDownUp ? 'Move Down' : 'Move right'}>
        {showRight && (
          <Iconly
            name={isMobile || onlyDownUp ? 'ChevronDown' : 'ChevronRight'}
            onClick={() => handleMove('right')}
            className="chevron-icon"
            set="bold"
          />
        )}
      </IconTooltip>
      <IconTooltip content="Delete">
        <Delete className="delete-icon" set="bold" onClick={handleDelete} />
      </IconTooltip>
    </ActionContainer>
  );
};

ActionButtons.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onlyDownUp: PropTypes.bool,
  index: PropTypes.number,
  showLeft: PropTypes.bool,
  showRight: PropTypes.bool,
  onMove: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActionButtons;
