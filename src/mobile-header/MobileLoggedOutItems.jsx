import React from 'react';
import PropTypes from 'prop-types';

const MobileLoggedOutItems = ({ items }) => (
  <div className="kkux-mobile-drawer__logged-out">
    {items.map(({ type, href, content }, i) => (
      <a
        key={`${type}-${content}`}
        className={i === 0
          ? 'kkux-mobile-drawer__item'
          : 'kkux-mobile-drawer__item kkux-mobile-drawer__item--brand'}
        href={href}
      >
        {content}
      </a>
    ))}
  </div>
);

export const mobileHeaderLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string,
}));

MobileLoggedOutItems.propTypes = { items: mobileHeaderLoggedOutItemsDataShape };

export default MobileLoggedOutItems;
