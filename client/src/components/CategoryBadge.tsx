import { FC } from "react"

interface CategoryBadgeProps {
  color?: string | null
  label?: string | null
}

export const CategoryBadge: FC<CategoryBadgeProps> = ({ color, label }) => {
  return (
    <div className="category--badge" style={color ? { backgroundColor: color } : {}}>
      {label ? label : "no category"}
    </div>
  )
}
