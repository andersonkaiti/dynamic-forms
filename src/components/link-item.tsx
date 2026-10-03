import { cn } from 'cn'
import { Reorder, useDragControls } from 'framer-motion'
import { GripVerticalIcon, Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Button } from './ui/button'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'

interface ILinkItemProps {
  isDraggingActive: boolean
  link: {
    title: string
    url: string
    id: string
  }
  index: number
  onDragStart: (index: number) => void
  onDragEnd: () => void
  onRemove: (index: number) => void
}

export function LinkItem({
  link,
  index,
  isDraggingActive,
  onDragStart,
  onDragEnd,
  onRemove,
}: ILinkItemProps) {
  const form = useFormContext()
  const controls = useDragControls()

  return (
    <Reorder.Item
      key={link.id}
      value={link}
      onDragStart={() => onDragStart(index)}
      onDragEnd={onDragEnd}
      className="relative"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={cn(
          'grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2',
          isDraggingActive && 'opacity-50',
        )}
      >
        <Field className="flex-1">
          <FieldLabel htmlFor="title">Título</FieldLabel>
          <Input id="title" {...form.register(`links.${index}.title`)} />
        </Field>

        <Field className="flex-1" orientation="horizontal">
          <Field>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input id="url" {...form.register(`links.${index}.url`)} />
          </Field>

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="self-end"
            onClick={() => onRemove(index)}
          >
            <Trash2Icon className="size-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="link"
            className="cursor-grab self-end"
            onPointerDown={(event) => controls.start(event)}
          >
            <GripVerticalIcon className="size-4" />
          </Button>
        </Field>
      </div>
    </Reorder.Item>
  )
}
