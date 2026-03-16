"use client";
import { useRef, useCallback } from "react";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Plus } from "lucide-react";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  error?: string;
}

function useStableIds(length: number) {
  const ids = useRef<string[]>([]);
  while (ids.current.length < length) {
    ids.current.push(`item-${ids.current.length}-${Math.random().toString(36).slice(2, 7)}`);
  }
  return ids.current.slice(0, length);
}

function SortableItem({
  id, value, onChange, onDelete, placeholder,
}: {
  id: string; value: string;
  onChange: (v: string) => void; onDelete: () => void; placeholder?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1.5"
    >
      <button type="button" {...attributes} {...listeners}
        className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing flex-shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-dynamic-list-input="true"
        className="flex-1 text-sm outline-none text-slate-700 placeholder:text-slate-300 bg-transparent"
      />
      <button type="button" onClick={onDelete}
        className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function DynamicListEditor({ items, onChange, placeholder, error }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));
  const stableIds = useStableIds(items.length);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = stableIds.indexOf(active.id as string);
    const newIndex = stableIds.indexOf(over.id as string);
    onChange(arrayMove(items, oldIndex, newIndex));
  }, [items, stableIds, onChange]);

  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, ""]);
    setTimeout(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>("[data-dynamic-list-input]");
      inputs[inputs.length - 1]?.focus();
    }, 50);
  };

  return (
    <div className="space-y-2">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stableIds} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={stableIds[index]}
              id={stableIds[index]}
              value={item}
              onChange={(v) => updateItem(index, v)}
              onDelete={() => removeItem(index)}
              placeholder={placeholder}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button type="button" onClick={addItem}
        className="flex items-center gap-1.5 text-sm text-[#08477C] font-semibold hover:text-[#063a66] transition-colors">
        <Plus className="w-4 h-4" />
        Add item
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
