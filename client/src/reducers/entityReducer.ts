import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { RootAction, RootEntitiesType } from '../actions/rootTypes';
import { Article } from '../models/Article';
import { Blog } from '../models/Blog';
import { Category } from '../models/Category';
import { Dictionary } from '../models/Dictionary';

export interface EntityState {
  articles: Dictionary<Article>;
  blogs: Dictionary<Blog>;
  categories: Dictionary<Category>;
}

export const initialState: EntityState = {
  articles: {},
  blogs: {},
  categories: {},
};

export function entityReducer(state: EntityState = initialState, action: RootAction): EntityState {
  if ('entities' in action) {
    return mergeEntities(state, action.entities);
  }

  switch (action.type) {
    case BlogActionTypes.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: removeEntities(state.blogs, blog => blog.id === action.id),
        articles: removeEntities(state.articles, article => article.blogId === action.id),
      };
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: removeEntities(state.categories, category => category.id === action.id),
        blogs: removeEntities(state.blogs, blog => blog.categoryId === action.id),
        // todo: articles
      };
    default:
      return state;
  }
}

function mergeEntities(state: EntityState, newEntities: RootEntitiesType): EntityState {
  return {
    ...state,
    articles: { ...state.articles, ...fixArticleDate(newEntities.articles) },
    blogs: { ...state.blogs, ...newEntities.blogs },
    categories: { ...state.categories, ...newEntities.categories },
  };
}

function removeEntities<T>(coll: Dictionary<T>, condition: (entity: T) => boolean): Dictionary<T> {
  return Object.fromEntries(Object.entries(coll).filter(([, entity]) => !condition(entity)));
}

function fixArticleDate(articles?: Dictionary<Article>): Dictionary<Article> | undefined {
  if (!articles) {
    return;
  }

  return Object.fromEntries(
    Object.entries(articles).map(([key, article]) => {
      return [key, { ...article, date: new Date(article.date) }];
    }),
  );
}
