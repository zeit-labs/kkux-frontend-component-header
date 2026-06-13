import React from 'react';
import PropTypes from 'prop-types';

const DesktopHeaderUserMenu = ({ menu }) => menu.map((group, index) => (
  <React.Fragment key={index}>
    {group.heading && (
      <div className="kkux-dropdown__label" role="heading" aria-level="1">
        {group.heading}
      </div>
    )}
    {group.items.map(({
      type, content, href, disabled, isActive, onClick, variant,
    }) => (
      <a
        className={`kkux-dropdown__item${
          disabled ? ' kkux-dropdown__item--disabled' : ''
        }${
          isActive ? ' kkux-dropdown__item--active' : ''
        }${
          variant === 'destructive' ? ' kkux-dropdown__item--destructive' : ''
        }`}
        key={`${type}-${content}`}
        href={disabled ? undefined : href}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    ))}
    {index < menu.length - 1 && (
      <div className="kkux-dropdown__separator" role="separator" />
    )}
  </React.Fragment>
));

export const desktopUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  })),
}));

DesktopHeaderUserMenu.propTypes = {
  menu: desktopUserMenuDataShape,
};

export default DesktopHeaderUserMenu;
