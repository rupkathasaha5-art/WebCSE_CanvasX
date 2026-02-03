
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { BlockTemplate } from "../blocks/BlockTemplate";

const ITEM_TYPE = "BLOCK";

export default function Canvas({ blocks, updateBlock, removeBlock }) {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      // onBlockDropped handled by parent now
      console.log("Block dropped:", item.type);
    },
  });

  return (
    <div ref={drop} className="relative h-full w-full overflow-auto p-4  ">
      <div 
      id="canvas"
      className="relative h-full  w-full rounded-lg border border-dashed border-slate-300 bg-white/70">
        {blocks.map((block) => (
          <Rnd
            key={block.id}
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            bounds="parent"
            onDragStop={(e, d) => updateBlock(block.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, position) =>
              updateBlock(block.id, {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
                x: position.x,
                y: position.y,
              })
            }
            className="absolute box-border"
          >
            <div className="flex h-full w-full flex-col rounded-md border border-black-500 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-2 py-1 text-xs">
                <span className="font-semibold capitalize text-slate-700">
                  {block.type}
                </span>
                <button
                  type="button"
                  data-editor-only
                  onClick={() => removeBlock(block.id)}
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  X
                </button>
              </div>
              <div className="flex-1 overflow-auto px-3 py-2 text-xs">
                <BlockTemplate block={block} updateBlock={updateBlock} />
              </div>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
