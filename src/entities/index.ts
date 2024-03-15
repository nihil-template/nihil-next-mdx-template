// 이 폴더에서는 데이터만을 다룬다. 데이터의 타이핑이나 데이터 그 자체를 여기에 넣어둔다. prisma 등등.

export {
  type BlockItem,
  type TextBlockItem,
  type HeadingBlockItem,
  type ImageBlockItem,
  type ListBlockItem,
  type QuoteBlockItem,
  type CodeBlockItem,
  type YoutubeBlockItem,
  type MessageBlockItem
} from './editor/editor.types';

export { useEditStore } from './editor/editor.store';

export {
  type ICreatePost,
  type IPatchPost
} from './posts/posts.types';
