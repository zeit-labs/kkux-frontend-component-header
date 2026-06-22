import React from 'react';
import PropTypes from 'prop-types';

const MobileHeaderMainMenu = ({ menu }) => {
  if (!Array.isArray(menu)) { return menu; }

  return (
    <div className="kkux-mobile-nav">
      {menu.map((menuItem) => {
        const { type, href, content, disabled, isActive, onClick } = menuItem;

        if (type !== 'item') { return null; }

        return (
          <a
            key={`${type}-${content}`}
            className={`kkux-mobile-nav__link${disabled ? ' kkux-mobile-nav__link--disabled' : ''}${isActive ? ' kkux-mobile-nav__link--active' : ''}`}
            href={disabled ? undefined : href}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            aria-disabled={disabled || undefined}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
};

export const mobileHeaderMainMenuDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

MobileHeaderMainMenu.propTypes = { menu: mobileHeaderMainMenuDataShape };

export default MobileHeaderMainMenu;
