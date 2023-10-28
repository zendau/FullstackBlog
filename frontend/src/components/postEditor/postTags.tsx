import React, { memo, useRef, useState } from "react";

const PostTags: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const tagInput = useRef<HTMLInputElement>(null);

  function tagPressHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const tag = tagInput.current?.value;

    if (!tag) return;

    tagInput.current.value = "";

    if (tags.includes(tag)) return;

    setTags((prevTags) => [...prevTags, tag]);
  }

  function removeTag(e: React.MouseEvent<HTMLParagraphElement>) {
    const removedTag: string | null = e.currentTarget.textContent;

    if (!removedTag) return;

    setTags((tags) => tags.filter((tag) => `#${tag}` !== removedTag));
  }

  return (
    <>
      <input type="text" ref={tagInput} />
      <button type="button" onClick={tagPressHandler}>
        add
      </button>
      {tags.map((tag) => (
        <p onClick={removeTag} key={tag}>
          #{tag}
        </p>
      ))}
    </>
  );
};

export default PostTags;
