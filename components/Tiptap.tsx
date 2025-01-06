//tip tap component
// npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

// npx shadcn@latest add toggle-group

// npm install @tiptap/extension-underline


'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, List, Underline as UnderlineIcon,ListOrdered } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
 
export function ToggleGroupDemo({ editor }:{editor:any}) {
  if (!editor) {
    return null;
  }
 
  return (
    <ToggleGroup type="multiple" variant="outline" className=' mb-2 space-x-3'>
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
 
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
 
      <ToggleGroupItem
        value="underline"
        aria-label="Toggle underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem>
 
      <ToggleGroupItem
        value="bulletList"
        aria-label="Toggle bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
 
   
    </ToggleGroup>
  );
}
 
const Tiptap = ({description,onChange}:{description:string, onChange: (newContent: string) => void}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList:false,orderedList:false,listItem:false
      }), // Include all default extensions
      BulletList, // Explicitly add bullet list
      OrderedList, // Explicitly add ordered list
      ListItem, // Explicitly add list item support
      Underline, // Explicitly add underline
    ],immediatelyRender: false,
    content: description,
    editorProps:{
      attributes:{
        class:"min-h-[150px] border rounded border-input px-5 py-2"
      }
    } ,// Set initial content from description prop
    onUpdate: ({ editor }) => {
      // Update the parent component when editor content changes
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor && description === '') {
      editor.commands.setContent(''); // Explicitly clear the editor content
    }
  }, [description, editor]);
 
 
  return (
    <>
      <ToggleGroupDemo editor={editor} />
      <EditorContent editor={editor}    />
    </>
  );
};
 
export default Tiptap;