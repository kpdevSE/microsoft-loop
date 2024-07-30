"use client";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function EmojiPickerComponent({ children, setEmojiIcon }) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(true)}>{children}</div>

      {openEmojiPicker && (
        <div className="absolute z-10">
          <EmojiPicker
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji), setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
