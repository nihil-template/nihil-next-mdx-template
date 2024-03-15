import { create } from 'zustand';
import { type BlockItem, TextBlockItem } from '@/src/entities';

interface EditorState {
  postContent: BlockItem[];
  setPostContent: (value: BlockItem[]) => void;
  saveTextBlock: (id: string, text: string) => void;
  addBlock: (value: BlockItem) => void;
  removeBlock: (id: string) => void;
}

export const useEditStore = create<EditorState>(
  (set) => ({
    postContent: [],
    setPostContent(value: BlockItem[]) {
      set(() => ({
        postContent: value,
      }));
    },
    saveTextBlock(id, text) {
      set((state) => {
        const copyArray = [ ...state.postContent, ];

        const findBlock = copyArray.find(
          (item) => item.id === id
        ) as TextBlockItem;

        findBlock.text = text;

        return {
          postContent: copyArray,
        };
      });
    },
    addBlock(value: BlockItem) {
      set((state) => {
        return {
          postContent: [ ...state.postContent, value, ],
        };
      });
    },
    removeBlock(id: string) {
      set((state) => ({
        postContent: state.postContent.filter(
          (item) => item.id !== id
        ),
      }));
    },
  })
);
