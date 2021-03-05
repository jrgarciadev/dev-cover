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
  hideMove = false,
  showLeft = true,
  onlyDownUp = false,
  showEdit = false,
  id = '',
  onMove,
  onEdit,
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
  const handleEdit = () => {
    if (!isFunction(onEdit)) return;
    onEdit();
  };
  return (
    <ActionContainer>
      <IconTooltip content={isMobile || onlyDownUp ? 'Move Up' : 'Move left'}>
        {showLeft && !hideMove && (
          <Iconly
            name={isMobile || onlyDownUp ? 'ChevronUp' : 'ChevronLeft'}
            onClick={() => handleMove('left')}
            className="icon chevron-icon"
            set="bold"
          />
        )}
      </IconTooltip>
      <IconTooltip content={isMobile || onlyDownUp ? 'Move Down' : 'Move right'}>
        {showRight && !hideMove && (
          <Iconly
            name={isMobile || onlyDownUp ? 'ChevronDown' : 'ChevronRight'}
            onClick={() => handleMove('right')}
            className="icon chevron-icon"
            set="bold"
          />
        )}
      </IconTooltip>
      <IconTooltip content="Edit">
        {showEdit && (
          <Iconly name="Edit" onClick={handleEdit} className="icon edit-icon" set="bold" />
        )}
      </IconTooltip>
      <IconTooltip content="Delete">
        <Delete className="icon delete-icon" set="bold" onClick={handleDelete} />
      </IconTooltip>
    </ActionContainer>
  );
};

ActionButtons.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onlyDownUp: PropTypes.bool,
  index: PropTypes.number,
  showLeft: PropTypes.bool,
  showEdit: PropTypes.bool,
  hideMove: PropTypes.bool,
  showRight: PropTypes.bool,
  onMove: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ActionButtons;
