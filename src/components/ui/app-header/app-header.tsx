import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();

  const isConstructorRoute =
    pathname === '/' || pathname.startsWith('/ingredients/');
  const isFeedRoute = pathname === '/feed' || pathname.startsWith('/feed/');
  const isProfileRoute = pathname.startsWith('/profile');

  const getLinkClassName = (isActive: boolean) =>
    clsx(styles.link, isActive && styles.link_active);

  return (
    <header className={styles.header}>
      <nav className={clsx(styles.menu, 'p-4')}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' end className={getLinkClassName(isConstructorRoute)}>
            <BurgerIcon type={isConstructorRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/feed' end className={getLinkClassName(isFeedRoute)}>
            <ListIcon type={isFeedRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <NavLink to='/profile' className={getLinkClassName(isProfileRoute)}>
            <ProfileIcon type={isProfileRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
