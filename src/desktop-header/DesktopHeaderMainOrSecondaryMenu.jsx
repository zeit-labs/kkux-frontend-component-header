import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { CaretIcon } from '../Icons';

const DesktopHeaderMainOrSecondaryMenu = ({ menu }) => {
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map((menuItem) => {
    const {
      type,
      href,
      content,
      submenuContent,
      disabled,
      isActive,
      onClick,
    } = menuItem;

    // Submenu items (type === 'submenu' or type === 'menu')
    if (type !== 'item') {
      return (
        <Menu key={`${type}-${content}`} tag="div" className="kkux-header__nav-item kkux-header__nav-item--dropdown" respondToPointerEvents>
          <MenuTrigger
            onClick={onClick || null}
            tag="a"
            className="kkux-header__nav-link kkux-header__nav-link--has-children"
            href={href}
          >
            {content}
            <CaretIcon role="img" aria-hidden focusable="false" />
          </MenuTrigger>
          <MenuContent className="kkux-header__dropdown">
            {submenuContent}
          </MenuContent>
        </Menu>
      );
    }

    // Simple link items — matches marketing site NavItem
    return (
      <a
        key={`${type}-${content}`}
        className={
          `kkux-header__nav-link${
            disabled ? ' kkux-header__nav-link--disabled' : ''
          }${
            isActive ? ' kkux-header__nav-link--active' : ''
          }`
        }
        href={disabled ? undefined : href}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || undefined}
      >
        <span>{content}</span>
        {/* Active indicator — matches marketing site bg-growth-300/50 bar */}
        {isActive && (
          <div className="kkux-header__nav-active-bar" aria-hidden="true" />
        )}
      </a>
    );
  });
};

export const desktopHeaderMainOrSecondaryMenuDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

DesktopHeaderMainOrSecondaryMenu.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopHeaderMainOrSecondaryMenu;
