import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

const initialParams = {
	fontFamily: defaultArticleState.fontFamilyOption,
	fontSize: defaultArticleState.fontSizeOption,
	fontColor: defaultArticleState.fontColor,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
};

export const ArticleParamsForm = ({
	onFormSubmit,
}: {
	onFormSubmit: (formState: typeof initialParams) => void;
}) => {
	const [state, setState] = useState({ ...initialParams, isOpen: false });

	const handleClear = () => {
		const newState = { isOpen: state.isOpen, ...initialParams };
		setState(newState);
		onFormSubmit(newState);
	};

	const handleApply = () => {
		onFormSubmit(state);
	};

	const formRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClick = (e: Event) => {
			if (!formRef.current || !(e.target instanceof HTMLElement)) {
				return;
			}

			if (!formRef.current.contains(e.target)) {
				setState((prev) => ({ ...prev, isOpen: false }));
			}
		};

		document.addEventListener('click', handleClick, { capture: true });
		return () => document.removeEventListener('click', handleClick);
	}, []);

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={state.isOpen}
				onClick={() => setState({ ...state, isOpen: !state.isOpen })}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: state.isOpen,
				})}>
				<form className={styles.form}>
					<div style={{ marginBottom: '30px' }}>
						<Text size={22} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>

					<div style={{ marginBottom: '30px' }}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={state.fontFamily}
							onChange={(value) => setState({ ...state, fontFamily: value })}
						/>
					</div>

					<div style={{ marginBottom: '30px' }}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={state.fontSize}
							onChange={(value) => setState({ ...state, fontSize: value })}
						/>
					</div>

					<div style={{ marginBottom: '30px' }}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={state.fontColor}
							onChange={(value) => setState({ ...state, fontColor: value })}
						/>
					</div>

					<div style={{ marginBottom: '30px' }}>
						<Separator />
					</div>

					<div style={{ marginBottom: '30px' }}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={state.backgroundColor}
							onChange={(value) =>
								setState({ ...state, backgroundColor: value })
							}
						/>
					</div>

					<div style={{ marginBottom: '30px' }}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={state.contentWidth}
							onChange={(value) => setState({ ...state, contentWidth: value })}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
