// 이 폴더에서는 앱에서 전체적으로 사용될 수 있는 여러 요소들을 다룬다. 데이터일 수도 있고, 기능일 수도 있고 화면일 수도 있다.

// types
export {
  type ISiteMeta,
  type IConfigData
} from './types/site.types';
export {
  type ApiResponse
} from './types/api.types';

// data
export { configData } from './data/config.data';
export { keysData } from './data/keys.data';

// hooks
export { useInput } from './hooks/useInput';
export { useGetPosts } from './hooks/query/useGetPosts';
export { useGetPostById } from './hooks/query/useGetPostById';
export { useCreatePost } from './hooks/query/useCreatePost';
export { useUpdatePost } from './hooks/query/useUpdatePost';

// entities

// components
export { ToggleDarkMode } from './components/ToggleDarkMode';

export { DefaultPage } from './widgets/DefaultPage';
export { Providers } from './widgets/Providers';

// layouts
export { Header } from './layouts/Header';
export { Nav } from './layouts/Nav';
export { AppMain } from './layouts/AppMain';
export { Footer } from './layouts/Footer';
export { Logo } from './layouts/Logo';

// 스토어
export {
  commonStore,
  setDarkMode
} from './store/common.store';

// utils
export { Nihil } from './utils/nihil';
export { Api } from './utils/axios';
export { setMeta } from './utils/setMeta';
export { Db } from './utils/prisma';
