import { BsCheck2 } from "react-icons/bs"

type Props = {
  checked: boolean
  outterClass?: string | string[] | undefined
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const Checkbox = ({ outterClass, checked, ...props }: Props) => {
  const outterCls = `checkbox-box${outterClass ? ` ${outterClass}` : ""}`
  return (
    <div className={outterCls}>
      <input className="checkbox--hidden" type="checkbox" checked={checked} readOnly />
      <div className={`checkbox--custom ${checked ? "checked" : ""}`} {...props}>
        {checked && (
          <span className="checkbox-icon">
            <BsCheck2 />
          </span>
        )}
      </div>
    </div>
  )
}
