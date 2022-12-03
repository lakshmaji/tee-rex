import React from 'react';
import { IFooterLink } from '../../types/common';
import { classNames } from '../../utils/common.utils';
import styles from './footer.module.scss';

const LINKS: IFooterLink[] = [
  {
    link: 'https://github.com/lakshmaji',
    name: 'Github',
    icon: 'fa-github',
  },
  {
    link: 'https://lakshmaji.medium.com',
    name: 'Medium',
    icon: 'fa-medium',
  },
  {
    link: 'https://dev.to/lakshmaji',
    name: 'Dev.to',
    icon: 'fa-th-large',
  },
];

const Footer = () => {
  return (
    <footer className='py-3 my-4 bg-dark'>
      <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
        {LINKS.map((item) => {
          return (
            <li className='nav-item' key={item.name}>
              <a
                href={item.link}
                className={classNames('nav-link px-2 text-white', styles.text_sm)}
              >
                <i className={`fa fa-${item.icon} pr-2`} aria-hidden='true'></i>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
      <p className='text-center text-muted'>© 2022 Company, Inc</p>
    </footer>
  );
};

export default Footer;
