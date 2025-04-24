import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageState, setPageState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					// '--font-family': defaultArticleState.fontFamilyOption.value,
					// '--font-size': defaultArticleState.fontSizeOption.value,
					// '--font-color': defaultArticleState.fontColor.value,
					// '--container-width': defaultArticleState.contentWidth.value,
					// '--bg-color': defaultArticleState.backgroundColor.value,
					'--font-family': pageState.fontFamily,
					'--font-size': pageState.fontSize,
					'--font-color': pageState.fontColor,
					'--container-width': pageState.contentWidth,
					'--bg-color': pageState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onFormSubmit={(formState) =>
					setPageState({
						fontFamily: formState.fontFamily.value,
						fontSize: formState.fontSize.value,
						fontColor: formState.fontColor.value,
						contentWidth: formState.contentWidth.value,
						backgroundColor: formState.backgroundColor.value,
					})
				}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
