import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@openedx/paragon';

// data-variant attribute + className hook let us style the destructive
// item with the marketing-site DropdownMenuItem destructive variant
// (color #d92d20 + bg-destructive/10 on focus) via SCSS attribute
// selector, since react-bootstrap's Dropdown.Item doesn't take a
// `variant` prop natively.
const LearningHeaderUserMenuItems = ({ items }) => items.map((item, index) => {
  if (item.separator) {
    return <Dropdown.Divider key={`sep-${index}`} />;
  }
  const isDestructive = item.variant === 'destructive';
  return (
    <Dropdown.Item
      key={`item-${item.href}-${index}`}
      href={item.href}
      data-variant={isDestructive ? 'destructive' : undefined}
      className={isDestructive ? 'pgn__dropdown-item-destructive' : undefined}
    >
      {item.message}
    </Dropdown.Item>
  );
});

export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.oneOf(['destructive']),
    separator: PropTypes.bool,
  })),
};

LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;

export default LearningHeaderUserMenuItems;
