import React from 'react';
import cn from 'classnames';
import { useResizeObserver } from '../../shared/lib/hooks';
import { TodoList } from '../TodoList';
import styles from './MainContent.module.scss';
import { AddTodoItem } from '../AddTodoItem';
import { TodoFilter } from '../TodoFilter';
import { Search } from '../Search';
import { useThemeContext } from '../../context/ThemeContext';
import { getBackgroundColor } from '../../shared/lib/utils/themeUtils';
import themeStyles from '../../shared/lib/styles/Theme.module.scss';
import { CommentList } from '../CommentList';
import { AddComment } from '../AddComment';
import { YandexShare } from '../YaShare';

export const MainContent = () => {
    const { currentTheme } = useThemeContext();
    const backgroundColor = getBackgroundColor(currentTheme);

    const { observedElementRef, size } = useResizeObserver();
    const isVertical = size.width < 1200;

    return (
        <main className={cn(themeStyles[backgroundColor], styles.mainPage)}>
            <Search />
            <TodoFilter />
            <section
                className={cn(styles.mainSection, { [styles.verticalLayout]: isVertical })}
                ref={observedElementRef}
            >
                <div>
                    <CommentList />
                    <AddComment />
                </div>
                <div>
                    <TodoList />
                    <AddTodoItem />
                </div>
            </section>
            {/* /!* <YandexShare /> *!/ ему что то тут не нравится, я закомментировала */}
        </main>
    );
};
