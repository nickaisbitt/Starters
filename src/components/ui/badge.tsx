import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-black px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-architects uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black",
        secondary:
          "border-transparent bg-yellow-300 text-black hover:bg-yellow-400 transform -rotate-2",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 transform rotate-2",
        outline: "text-foreground bg-white dark:bg-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
