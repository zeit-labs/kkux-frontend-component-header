import React from 'react';
import PropTypes from 'prop-types';

const MobileHeaderUserMenu = ({ menu }) => menu.map((group, gi) => (
  <React.Fragment key={gi}>
    {group.heading && (
      <div className="kkux-mobile-drawer__label">{group.heading}</div>
    )}
    {group.items.map(({
      type, content, href, disabled, isActive, onClick, variant,
    }) => (
      <a
        key={`${type}-${content}`}
        className={`kkux-mobile-drawer__item${disabled ? ' kkux-mobile-drawer__item--disabled' : ''}${isActive ? ' kkux-mobile-drawer__item--active' : ''}${variant === 'destructive' ? ' kkux-mobile-drawer__item--destructive' : ''}`}
        href={disabled ? undefined : href}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    ))}
    {gi < menu.length - 1 && <div className="kkux-mobile-drawer__separator" />}
  </React.Fragment>
));

export const mobileHeaderUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    variant: PropTypes.string,
  })),
}));

MobileHeaderUserMenu.propTypes = { menu: mobileHeaderUserMenuDataShape };

export default MobileHeaderUserMenu;
